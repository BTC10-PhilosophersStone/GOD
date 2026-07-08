package com.example.bedrock

import org.springframework.ai.chat.client.ChatClient
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.boot.runApplication

@SpringBootApplication
class DemoApplication {

}

fun main(args: Array<String>) {
	runApplication<DemoApplication>(*args)
}