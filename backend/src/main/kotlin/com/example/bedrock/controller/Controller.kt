package com.example.bedrock.controller

import com.example.bedrock.prompt.AnalysisPrompt
import com.example.bedrock.prompt.ModifyPrompt
import com.example.bedrock.service.ServiceHandler
import org.springframework.ai.chat.client.ChatClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class Controller(
    private val builder: ChatClient.Builder,
    private val handler: ServiceHandler,
) {
  @PostMapping("/projectdata")
  fun createProjectData(@RequestBody body: ReqData): String {
    handler.createData(body)
    return "OK"
  }

  @PostMapping("/datasummary")
  fun dataSummary(@RequestBody body: SummaryRequest): String {
    val chatClient = builder.build()
      val result = chatClient.prompt()
          .system(AnalysisPrompt.SYSTEM_PROMPT)
          .user(
              """
        以下の議事録を分析してください。

        ${body.minutes}
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
  fun product(): List<Map<String, MutableMap<String?, Double>>> {
    return handler.getSimilarityList()
  }

  @PostMapping("/productmodify")
  fun productModify(@RequestBody body: String): String {
    val chatClient = builder.build()
    val result = chatClient.prompt()
      .system(ModifyPrompt.SYSTEM_PROMPT)
      .user(
        """
        以下のデータを分析してください。

        $body
        """.trimIndent()
      )
      .call()
      .content()
      ?.trim()
      ?: ""
    return result
  }
}
