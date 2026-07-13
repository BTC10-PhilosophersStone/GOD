plugins {
	kotlin("jvm") version "2.1.21"
	kotlin("plugin.spring") version "2.1.21"

	id("org.springframework.boot") version "3.5.4"
	id("io.spring.dependency-management") version "1.1.7"
	kotlin("plugin.jpa") version "2.1.21"
	kotlin("plugin.allopen") version "2.1.21"
}

group = "com.example"
version = "0.0.1"

repositories {
	mavenCentral()
}

extra["springAiVersion"] = "1.0.0"

dependencyManagement {
	imports {
		mavenBom("org.springframework.ai:spring-ai-bom:${property("springAiVersion")}")
	}
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.ai:spring-ai-starter-model-bedrock-converse")
	implementation("software.amazon.awssdk:bedrockruntime:2.31.0")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation(kotlin("reflect"))
	implementation(kotlin("stdlib"))
	implementation("org.hibernate.orm:hibernate-vector:6.6.22.Final")
	//DB用
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	runtimeOnly("com.h2database:h2")
	runtimeOnly("org.postgresql:postgresql")
	implementation("com.pgvector:pgvector:0.1.6")
	implementation("org.apache.poi:poi-ooxml:5.4.1")
}
allOpen {
	annotation("javax.persistence.Entity")
	annotation("javax.persistence.Embeddable")
	annotation("javax.persistence.MappedSuperclass")
	annotation("jakarta.persistence.Entity")
	annotation("jakarta.persistence.Embeddable")
	annotation("jakarta.persistence.MappedSuperclass")
}