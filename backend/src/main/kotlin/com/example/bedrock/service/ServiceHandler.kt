package com.example.bedrock.service

import com.example.bedrock.controller.ReqData
import com.example.bedrock.repository.Result
import com.example.bedrock.repository.DepartmentMst
import com.fasterxml.jackson.databind.ObjectMapper
import software.amazon.awssdk.core.SdkBytes
import software.amazon.awssdk.services.bedrockruntime.BedrockRuntimeClient
import software.amazon.awssdk.services.bedrockruntime.model.InvokeModelRequest

interface ServiceHandler {
  fun createData(reqData: ReqData)
  fun getDepartmentList(): List<DepartmentMst>

  fun generateEmbedding(text: String?, bedrockClient: BedrockRuntimeClient): FloatArray {
    val requestJson = """ { "inputText": "$text" } """.trimIndent()
    val request =
        InvokeModelRequest.builder()
            .modelId("amazon.titan-embed-text-v1")
            .contentType("application/json")
            .accept("application/json")
            .body(SdkBytes.fromUtf8String(requestJson))
            .build()
    val response = bedrockClient.invokeModel(request)
    val json = response.body().asUtf8String()
    return ObjectMapper().readTree(json)["embedding"].map { it.asDouble().toFloat() }.toFloatArray()
  }

  fun getSimilarityList(): List<Result>
}
