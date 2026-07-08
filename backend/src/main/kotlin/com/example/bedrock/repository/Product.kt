package com.example.bedrock.repository

import jakarta.persistence.*
import org.hibernate.annotations.ColumnTransformer
import java.time.LocalDateTime

@Entity
@Table(name = "product")
class Product(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long = 0,
    @Column(name = "create_at_data") val dateCreated: LocalDateTime = LocalDateTime.now(),
    @Column(name = "issues_who") val issuesWho: String? = null,
    @Column(name = "issues_what") val issuesWhat: String? = null,
    @Column(name = "issues_when") val issuesWhen: String? = null,
    @Column(name = "issues_where") val issuesWhere: String? = null,
    @Column(name = "issues_why") val issuesWhy: String? = null,
    @Column(name = "issues_how") val issuesHow: String? = null,
    @Column(name = "issues_what_why") val issuesWhatWhy: String? = null,
    @field:Column(name = "issues_vector", columnDefinition = "vector")
    @field:Convert(converter = VectorConverter::class)
    @field:ColumnTransformer(write = "?::vector")
    var issuesVector: FloatArray? = null,
    @Column(name = "issues_content") val issuesContent: String? = null,
    @Column(name = "provided_who") val providedWho: String? = null,
    @Column(name = "provided_why") val providedWhy: String? = null,
    @Column(name = "provided_outcome") val providedOutcome: String? = null,
    @field:Column(name = "provided_vector", columnDefinition = "vector")
    @field:Convert(converter = VectorConverter::class)
    @field:ColumnTransformer(write = "?::vector")
    var providedVector: FloatArray? = null,
    @Column(name = "department_combine") var departmentCombine: String? = null,
    @field:Column(name = "department_vector", columnDefinition = "vector")
    @field:Convert(converter = VectorConverter::class)
    @field:ColumnTransformer(write = "?::vector")
    var departmentVector: FloatArray? = null,
    @Column(name = "classification_combine") var classificationCombine: String? = null,
    @field:Column(name = "classification_vector", columnDefinition = "vector")
    @field:Convert(converter = VectorConverter::class)
    @field:ColumnTransformer(write = "?::vector")
    var classificationVector: FloatArray? = null,
)