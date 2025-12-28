/**
 * NestJS 应用入口文件
 * 负责应用初始化、全局配置和启动服务器
 */
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

/**
 * 应用启动函数
 * 配置全局中间件、管道、过滤器等，并启动 HTTP 服务器
 */
async function bootstrap() {
  // 创建 NestJS 应用实例
  const app = await NestFactory.create(AppModule)

  // 全局异常过滤器 - 统一处理所有 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter())

  // 全局验证管道 - 自动验证和转换请求数据
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动过滤掉没有装饰器的属性，防止恶意数据注入
      forbidNonWhitelisted: true, // 如果存在非白名单属性，抛出错误
      transform: true // 自动将请求数据转换为 DTO 类型
    })
  )

  // CORS 配置 - 允许跨域请求
  app.enableCors({
    origin: true, // 允许所有来源
    credentials: true // 允许携带凭证（如 cookies）
  })

  // API 前缀 - 所有路由统一添加 /api 前缀
  app.setGlobalPrefix('api')

  // Swagger API 文档配置
  const config = new DocumentBuilder()
    .setTitle('H5 API 文档')
    .setDescription('H5 移动端应用 API 接口文档')
    .setVersion('1.0')
    .addBearerAuth() // 添加 Bearer Token 认证支持
    .build()
  const document = SwaggerModule.createDocument(app, config)
  // 将 Swagger 文档挂载到 /api-docs 路径
  SwaggerModule.setup('api-docs', app, document)

  // 启动服务器，监听指定端口
  const port = process.env.PORT || 3000
  await app.listen(port)
  console.log(`🚀 应用运行在: http://localhost:${port}`)
  console.log(`📚 API 文档: http://localhost:${port}/api-docs`)
}

// 启动应用
bootstrap()

