package com.example.bedrock.repository

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "department")
class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0
    @Column(name = "product_id")
    var productId: Long? = null
    @Column(name = "department_name")
    var departmentName: String? = null
    @Column(name = "office_name")
    var officeName: String? = null
}