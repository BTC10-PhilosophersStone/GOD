package com.example.bedrock.repository

import org.springframework.data.jpa.repository.JpaRepository

interface DepartmentRepository : JpaRepository<Department, Long> {
    fun findByProductId(productId: Long): List<Department>
}