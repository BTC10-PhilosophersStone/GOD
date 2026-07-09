package com.example.bedrock.controller

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
    val advanceContent =
        "議事録分析・情報抽出プロンプト\n" +
            "あなたは業務分析を専門とするシステムアナリストです。\n" +
            "以下の議事録を分析し、「課題解決」「提供価値」「関連部署」「業務分野」を抽出してください。\n" +
            "共通ルール\n" +
            "\n" +
            "議事録に記載されている内容を優先して抽出してください。\n" +
            "推測は最小限としてください。\n" +
            "記載がない項目は「不明」としてください。\n" +
            "同じ内容は統合してください。\n" +
            "課題と解決策が複数存在する場合は、すべて抽出してください。\n" +
            "解決策が存在しない課題は抽出しないでください。\n" +
            "抽出した内容には、必ず議事録中の根拠となる文章を記載してください。\n" +
            "JSON以外は出力しないでください。\n" +
            "1. 課題解決（5W1H）\n" +
            "議事録から課題と、その解決内容を抽出してください。\n" +
            "以下の項目で整理してください。\n" +
            "\n" +
            "Who（誰が実施するか）\n" +
            "What（何を実施するか）\n" +
            "When（いつ）\n" +
            "Where（どこで）\n" +
            "Why（なぜ）\n" +
            "How（どのように）\n" +
            "WhatとWhyを組み合わせた内容の説明 \n" +
            "5W1Hで構成された内容の説明 \n" +
            "※課題は複数ではなくて、必ず1レコードでまとめ作成してください。\n" +
            "2. 提供価値\n" +
            "課題解決によって得られる提供価値を抽出してください。\n" +
            "以下の形式で整理してください。\n" +
            "\n" +
            "Who（価値を受ける対象）\n" +
            "What（提供される価値）\n" +
            "Outcome（最終的な成果・効果）\n" +
            "注意\n" +
            "\n" +
            "作業内容ではなく、利用者や組織が得られる価値を記載してください。\n" +
            "※提供価値も1レコードでまとめ作成してください。\n" +
            "3. 関連部署\n" +
            "議事録に登場する関係部署を抽出してください。\n" +
            "抽出項目\n" +
            "\n" +
            "部\n" +
            "室\n" +
            "ルール\n" +
            "\n" +
            "部と室は必ず1レコードとして出力してください。\n" +
            "同じ部に複数の室がある場合は、それぞれ別レコードにしてください。\n" +
            "室の記載がない場合は「不明」としてください。\n" +
            "部が不明な場合も推測せず「不明」としてください。\n" +
            "正式名称をそのまま使用してください。\n" +
            "例\n" +
            "{\n" +
            "“部”:“営業部”,\n" +
            "“室”:“営業企画室”,\n" +
            "}\n" +
            "4. 業務分野\n" +
            "議事録の内容から対象業務を分類してください。\n" +
            "以下の3階層で分類してください。\n" +
            "\n" +
            "大分類\n" +
            "中分類\n" +
            "小分類\n" +
            "ルール\n" +
            "\n" +
            "業務内容を表す分類としてください。\n" +
            "システム名ではなく業務内容で分類してください。\n" +
            "複数業務が存在する場合はすべて出力してください。\n" +
            "同じ分類は統合してください。\n" +
            "例\n" +
            "{\n" +
            "“大分類”:“営業”,\n" +
            "“中分類”:“顧客管理”,\n" +
            "“小分類”:“顧客情報更新”,\n" +
            "}\n" +
            "回答はJSONのみ返してください。" +
            "「課題解決」は　issues、「提供価値」はprovided、「関連部署」はdepartment、「業務分野」はclassification" +
            "と確実になるように下記の形式で出力していください\n" +
            "出力形式\n" +
            "{\n" +
            "  \"issues\":\n" +
            "    {\n" +
            "      \"Who\":\"\",\n" +
            "      \"What\":\"\",\n" +
            "      \"When\":\"\",\n" +
            "      \"Where\":\"\",\n" +
            "      \"Why\":\"\",\n" +
            "      \"How\":\"\",\n" +
            "      \"What_Why\":\"\",\n" +
            "      \"Content\":\"\",\n" +
            "    }\n" +
            "  ,\n" +
            "  \"provided\":\n" +
            "    {\n" +
            "      \"Who\":\"\",\n" +
            "      \"What\":\"\",\n" +
            "      \"Outcome\":\"\",\n" +
            "    }\n" +
            "  ,\n" +
            "  \"department\":[\n" +
            "    {\n" +
            "      \"departmentName\":\"\",\n" +
            "      \"officeName\":\"\",\n" +
            "    }\n" +
            "  ],\n" +
            "  \"classification\":[\n" +
            "    {\n" +
            "      \"mainCategory\":\"\",\n" +
            "      \"subCategory\":\"\",\n" +
            "      \"minorCategory\":\"\",\n" +
            "    }\n" +
            "  ]\n" +
            "}"
    val result = chatClient.prompt().user(advanceContent + body.minutes).call().content() ?: ""
    println(result)
    return result
  }

  @GetMapping("/product")
  fun product(): List<Map<String, Double>> {

    return handler.getSimilarityList()
  }
}
