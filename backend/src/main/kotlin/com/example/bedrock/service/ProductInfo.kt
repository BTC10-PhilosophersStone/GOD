package com.example.bedrock.service

import com.example.bedrock.repository.Classification
import com.example.bedrock.repository.Department
import com.example.bedrock.repository.Product
import java.util.Optional

class ProductInfo (
    var product: Optional<Product?>,
    var department: List<Department>,
    var classification: List<Classification>
)