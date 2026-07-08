package com.example.bedrock.controller

import com.example.bedrock.repository.Classification
import com.example.bedrock.repository.Department
import com.example.bedrock.repository.Product

class ReqData {
    val product: Product? = null
    val department: List<Department>? = null
    val classification: List<Classification>? = null
}