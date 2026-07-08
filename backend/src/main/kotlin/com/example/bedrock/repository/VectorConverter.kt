package com.example.bedrock.repository

import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter

@Converter
class VectorConverter : AttributeConverter<FloatArray, String> {

    override fun convertToDatabaseColumn(attribute: FloatArray?): String? {
        if (attribute == null || attribute.isEmpty()) return null

        return attribute.joinToString(
            separator = ",",
            prefix = "[",
            postfix = "]",
        )
    }

    override fun convertToEntityAttribute(dbData: String?): FloatArray? {
        if (dbData.isNullOrBlank()) return null

        return try {
            dbData.removeSurrounding("[", "]").split(",").map { it.trim().toFloat() }.toFloatArray()
        } catch (e: Exception) {
            throw IllegalStateException("Failed to parse vector text from DB: $dbData", e)
        }
    }
}