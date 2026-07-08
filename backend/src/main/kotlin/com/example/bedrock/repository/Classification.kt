package com.example.bedrock.repository

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table


@Entity
@Table(name = "classification")
class Classification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0
    @Column(name = "product_id")
    var productId: Long? = null
    @Column(name = "main_category")
    var mainCategory: String? = null
    @Column(name = "sub_category")
    var subCategory: String? = null
    @Column(name = "minor_category")
    var minorCategory: String? = null
}