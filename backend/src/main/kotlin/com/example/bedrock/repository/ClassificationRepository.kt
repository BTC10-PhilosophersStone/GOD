package com.example.bedrock.repository

import org.springframework.data.jpa.repository.JpaRepository
interface ClassificationRepository : JpaRepository<Classification, Long> {}