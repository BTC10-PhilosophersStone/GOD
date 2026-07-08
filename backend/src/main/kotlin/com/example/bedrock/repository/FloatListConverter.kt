package com.example.bedrock.repository

import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter

@Converter
class FloatListConverter : AttributeConverter<List<Float>, String> {

    override fun convertToDatabaseColumn(attribute: List<Float>?): String {
        return attribute?.joinToString(prefix = "[", postfix = "]") ?: "[]"
    }

    override fun convertToEntityAttribute(dbData: String?): List<Float> {
        return dbData
            ?.removePrefix("[")
            ?.removeSuffix("]")
            ?.split(",")
            ?.map { it.trim().toFloat() }
            ?: emptyList()
    }
}