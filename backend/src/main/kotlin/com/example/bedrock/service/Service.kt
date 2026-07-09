package com.example.bedrock.service

import com.example.bedrock.controller.ReqData
import com.example.bedrock.repository.ClassificationRepository
import com.example.bedrock.repository.DepartmentMst
import com.example.bedrock.repository.DepartmentMstRepository
import com.example.bedrock.repository.DepartmentRepository
import com.example.bedrock.repository.ProductRepository
import com.example.bedrock.repository.Result
import kotlin.math.floor
import kotlin.math.pow
import kotlin.math.sqrt
import org.springframework.stereotype.Service
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.bedrockruntime.BedrockRuntimeClient

@Service
class Service(
    private val productRepository: ProductRepository,
    private val departmentRepository: DepartmentRepository,
    private val classificationRepository: ClassificationRepository,
    private val departmentMstRepository: DepartmentMstRepository
) : ServiceHandler {
  override fun createData(reqData: ReqData) {
    val bedrockClient = BedrockRuntimeClient.builder().region(Region.US_EAST_1).build()
    var departmentVectorText = ""
    reqData.department?.forEach {
      departmentVectorText += it.departmentName + it.officeName
    }

    var classificationVectorText = ""
    reqData.classification?.forEach {
      classificationVectorText += it.mainCategory + it.subCategory + it.minorCategory
    }

    reqData.product?.let {
      it.departmentVector = generateEmbedding(departmentVectorText, bedrockClient)
    }
    reqData.product?.let {
      it.classificationVector = generateEmbedding(classificationVectorText, bedrockClient)
    }
    reqData.product?.let {
      it.issuesVector = generateEmbedding(reqData.product.issuesWhatWhy, bedrockClient)
    }
    reqData.product?.let {
      it.providedVector = generateEmbedding(reqData.product.providedOutcome, bedrockClient)
    }

    reqData.product?.let { it.departmentCombine = departmentVectorText }
    reqData.product?.let { it.classificationCombine = classificationVectorText }

    val t = productRepository.save(reqData.product)
    reqData.department?.forEach {
      if (t != null) {
        it.productId = t.id
      }
      departmentRepository.save(it)
    }
    reqData.classification?.forEach {
      if (t != null) {
        it.productId = t.id
      }
      classificationRepository.save(it)
    }
  }


  


  override fun getDepartmentList(): List<DepartmentMst> {
    return departmentMstRepository.findAll()
  }

  override fun getSimilarityList(): List<Result> {
    val dataList = productRepository.findAll()

    // ベクトルデータのリスト取得
    var issuesEmbeddingList = dataList.map { it.issuesVector.contentToString() }
    var providedEmbeddingList = dataList.map { it.providedVector.contentToString() }
    var departmentEmbeddingList = dataList.map { it.departmentVector.contentToString() }
    var classificationEmbeddingList = dataList.map { it.classificationVector.contentToString() }

    // 今ポストしたデータを削除した、それぞれのカラムリスト取得
    val idList = dataList.map { it.id }.dropLast(1)
    val nameList = dataList.map { it.name }.dropLast(1)
    val issuesList = dataList.map { it.issuesWhatWhy }.dropLast(1)
    val providedList = dataList.map { it.providedOutcome }.dropLast(1)
    val departmentList = dataList.map { it.departmentCombine }.dropLast(1)
    val classificationList = dataList.map { it.classificationCombine }.dropLast(1)

    // 今ポストしたベクトルデータの取得、先頭と末尾の角かっこ削除、リスト化、リストのStringをDoubleに変換
    val issuesLastEmbedding =
        issuesEmbeddingList.last().drop(1).dropLast(1).split(",").map { it.toDouble() }
    val providedLastEmbedding =
        providedEmbeddingList.last().drop(1).dropLast(1).split(",").map { it.toDouble() }
    val departmentLastEmbedding =
        departmentEmbeddingList.last().drop(1).dropLast(1).split(",").map { it.toDouble() }
    val classificationLastEmbedding =
        classificationEmbeddingList.last().drop(1).dropLast(1).split(",").map { it.toDouble() }

    // 今ポストしたベクトルデータの削除
    issuesEmbeddingList = issuesEmbeddingList.dropLast(1)
    providedEmbeddingList = providedEmbeddingList.dropLast(1)
    departmentEmbeddingList = departmentEmbeddingList.dropLast(1)
    classificationEmbeddingList = classificationEmbeddingList.dropLast(1)

    // コサイン類似度比較
    val issuesSimilarityList = cosineSimilarityList(issuesEmbeddingList, issuesLastEmbedding)
    val providedSimilarityList = cosineSimilarityList(providedEmbeddingList, providedLastEmbedding)
    val departmentSimilarityList =
        cosineSimilarityList(departmentEmbeddingList, departmentLastEmbedding)
    val classificationSimilarityList =
        cosineSimilarityList(classificationEmbeddingList, classificationLastEmbedding)

    // リザルトMap準備
    val issuesResult: MutableMap<String, Double> = mutableMapOf()
    val providedResult: MutableMap<String, Double> = mutableMapOf()
    val departmentResult: MutableMap<String, Double> = mutableMapOf()
    val classificationResult: MutableMap<String, Double> = mutableMapOf()

    // 総合類似度準備
    val overall: MutableList<Result> = mutableListOf()

    // リザルトMap入力
    for (i in issuesList.indices) {
      // 類似度が0.7以上だったら入力
      //      if (issuesSimilarityList[i] > 0.7)
      //      issuesResult["No.${i + 1} ${issuesList[i]}"] =
      //          floor((issuesSimilarityList[i] - 0.7) / 0.3 * 100)
      issuesResult["No.${idList[i]} ${issuesList[i]}"] = floor((issuesSimilarityList[i]) * 100)
    }
    for (i in providedList.indices) {
      //      if (providedSimilarityList[i] > 0.7)
      //          providedResult["No.${i + 1} ${providedList[i]}"] =
      //              floor((providedSimilarityList[i] - 0.7) / 0.3 * 100)
      providedResult["No.${idList[i]} ${providedList[i]}"] =
          floor((providedSimilarityList[i]) * 100)
    }

    for (i in departmentList.indices) {
      //      if (departmentSimilarityList[i] > 0.7)
      //          departmentResult["No.${i + 1} ${departmentList[i]}"] =
      //              floor((departmentSimilarityList[i] - 0.7) / 0.3 * 100)
      departmentResult["No.${idList[i]} ${departmentList[i]}"] =
          floor((departmentSimilarityList[i]) * 100)
    }

    for (i in classificationList.indices) {
      //      if (classificationSimilarityList[i] > 0.7)
      //          classificationResult["No.${i + 1} ${classificationList[i]}"] =
      //              floor((classificationSimilarityList[i] - 0.7) / 0.3 * 100)
      classificationResult["No.${idList[i]} ${classificationList[i]}"] =
          floor((classificationSimilarityList[i]) * 100)
    }

    // 総合類似度計算
    for (i in issuesList.indices) {
      val result =
          ((issuesSimilarityList[i] * 100 * 0.2) +
              (providedSimilarityList[i] * 100 * 0.6) +
              (departmentSimilarityList[i] * 100 * 0.1) +
              (classificationSimilarityList[i] * 100 * 0.1))
      if (result >= 70) {
        overall.add(
            Result(
                id = idList[i],
                name = nameList[i],
                percent = floor(result),
            )
        )
      }
    }
    println(overall)

    // 類似度で順位付け
    val overallRank =
        if (overall.size <= 4) overall.sortedByDescending { it.percent }
        else overall.sortedByDescending { it.percent }.slice(0..4)

    return overallRank
  }
}

fun cosineSimilarityList(vectorList: List<String>, vectorB: List<Double>): List<Double> {
  val resultList = mutableListOf<Double>()

  for (i in vectorList.indices) {
    val vectorA = vectorList[i].drop(1).dropLast(1).split(",").map { it.toDouble() }
    resultList.add(cosineSimilarity(vectorA, vectorB))
  }
  return resultList
}

fun cosineSimilarity(vectorA: List<Double>, vectorB: List<Double>): Double {
  var dotProduct = 0.0
  var normA = 0.0
  var normB = 0.0
  for (i in vectorA.indices) {
    dotProduct += vectorA[i] * vectorB[i]
    normA += vectorA[i].pow(2.0)
    normB += vectorB[i].pow(2.0)
  }
  return dotProduct / (sqrt(normA) * sqrt(normB))
}
