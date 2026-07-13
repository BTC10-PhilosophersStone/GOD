package com.example.bedrock.controller

import com.example.bedrock.repository.Classification
import com.example.bedrock.repository.Department
import com.example.bedrock.repository.Product

class ReqData {
    var product: Product? = null
    var department: List<Department>? = null
    var classification: List<Classification>? = null
}