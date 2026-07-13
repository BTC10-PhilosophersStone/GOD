package com.example.bedrock.controller

import com.example.bedrock.repository.Result
import com.example.bedrock.prompt.AnalysisPrompt
import com.example.bedrock.prompt.ModifyPrompt
import com.example.bedrock.repository.DepartmentMst
import com.example.bedrock.repository.DepartmentMstRepository
import com.example.bedrock.repository.Product
import com.example.bedrock.service.ProductInfo
import com.example.bedrock.service.ServiceHandler
import org.apache.poi.xwpf.usermodel.XWPFDocument
import org.springframework.ai.chat.client.ChatClient
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.util.Optional

@RestController
class Controller(
    private val builder: ChatClient.Builder,
    private val handler: ServiceHandler,
    private val departmentMstRepository: DepartmentMstRepository,
) {
  @PostMapping("/projectdata")
  fun createProjectData(@RequestBody body: ReqData): String {
    handler.createData(body)
    return "OK"
  }

    @PostMapping("/datasummary")
    fun dataSummary(
        @RequestPart(required = false)
        text: String?,
        @RequestPart(required = false)
        file: MultipartFile?
    ): String {
        val content = when {
            !text.isNullOrBlank() -> text
            file != null -> {
                val fileName = file.originalFilename?.lowercase()
                when {
                    fileName?.endsWith(".txt") == true ->
                        String(file.bytes, Charsets.UTF_8)
                    fileName?.endsWith(".docx") == true ->
                        XWPFDocument(file.inputStream).use { doc ->
                            doc.paragraphs.joinToString("\n") { it.text }
                        }
                    else ->
                        throw IllegalArgumentException("txt/docxのみ対応")
                }
            }
            else -> throw IllegalArgumentException("入力がありません")
        }
        val chatClient = builder.build()
        val result = chatClient.prompt()
            .system(AnalysisPrompt.SYSTEM_PROMPT)
            .user(
                """
        以下の議事録を分析してください。

        ${content}
        """.trimIndent()
            )
            .call()
            .content()
            ?.trim()
            ?: ""
        println(result)
        return result
    }

  @GetMapping("/product")
  fun product(): List<Result> {

    return handler.getSimilarityList()
  }

  @GetMapping("/product/{id}")
  fun product(@PathVariable id: Long):ProductInfo {
      println(id)
    return handler.getProduct(id)
  }

  @GetMapping("/department")
  fun department(): List<DepartmentMst> {
    return handler.getDepartmentList()
  }

  @PostMapping("/productmodify")
  fun productModify(@RequestBody body: String): String {
    val chatClient = builder.build()
    val result =
        chatClient
            .prompt()
            .system(ModifyPrompt.SYSTEM_PROMPT)
            .user(
                """
        以下のデータを分析してください。

        $body
        """
                    .trimIndent()
            )
            .call()
            .content()
            ?.trim() ?: ""
    return result
  }
}
