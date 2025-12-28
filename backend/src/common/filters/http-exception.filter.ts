/**
 * HTTP 异常过滤器
 * 全局异常处理，统一格式化所有 HTTP 异常响应
 * 捕获所有异常并返回统一的错误格式
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch() // 捕获所有类型的异常
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 处理异常
   * @param exception - 捕获的异常对象
   * @param host - 执行上下文，用于获取请求和响应对象
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    // 判断异常类型，获取 HTTP 状态码
    // 如果是 HttpException，使用其状态码；否则使用 500 内部服务器错误
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    // 获取异常消息
    // 如果是 HttpException，获取其响应消息；否则使用默认消息
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error'

    // 构建统一的错误响应格式
    const errorResponse = {
      statusCode: status, // HTTP 状态码
      message: typeof message === 'string' ? message : (message as any).message || 'Internal server error', // 错误消息
      timestamp: new Date().toISOString(), // 错误发生时间
      path: request.url // 请求路径
    }
    
    // 返回格式化的错误响应
    response.status(status).json(errorResponse)
  }
}

