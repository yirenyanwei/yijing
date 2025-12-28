#!/bin/bash

# Docker 服务管理脚本

case "$1" in
  start)
    echo "🚀 启动所有 Docker 服务（MySQL + Redis）..."
    docker-compose up -d
    echo ""
    echo "⏳ 等待服务启动（10秒）..."
    sleep 10
    echo ""
    echo "✅ 服务启动完成！"
    echo ""
    echo "📊 服务状态："
    docker-compose ps
    echo ""
    echo "📝 验证服务："
    echo "  MySQL: docker exec -it mysql-h5 mysql -uroot -proot123456 -e 'SHOW DATABASES;'"
    echo "  Redis: docker exec -it redis-h5 redis-cli ping"
    ;;
  stop)
    echo "🛑 停止所有 Docker 服务..."
    docker-compose down
    echo "✅ 服务已停止"
    ;;
  restart)
    echo "🔄 重启所有 Docker 服务..."
    docker-compose restart
    echo "✅ 服务已重启"
    ;;
  status)
    echo "📊 服务状态："
    docker-compose ps
    ;;
  logs)
    if [ -z "$2" ]; then
      echo "📋 所有服务日志："
      docker-compose logs --tail=50
    else
      echo "📋 $2 服务日志："
      docker-compose logs -f "$2"
    fi
    ;;
  mysql)
    echo "🔌 连接 MySQL..."
    docker exec -it mysql-h5 mysql -uroot -proot123456
    ;;
  redis)
    echo "🔌 连接 Redis..."
    docker exec -it redis-h5 redis-cli
    ;;
  test)
    echo "🧪 测试服务连接..."
    echo ""
    echo "测试 MySQL:"
    docker exec -it mysql-h5 mysql -uroot -proot123456 -e "SELECT VERSION();" 2>/dev/null && echo "✅ MySQL 连接成功" || echo "❌ MySQL 连接失败"
    echo ""
    echo "测试 Redis:"
    docker exec -it redis-h5 redis-cli ping 2>/dev/null && echo "✅ Redis 连接成功" || echo "❌ Redis 连接失败"
    ;;
  *)
    echo "Docker 服务管理脚本"
    echo ""
    echo "用法: $0 {start|stop|restart|status|logs|mysql|redis|test}"
    echo ""
    echo "命令说明："
    echo "  start    - 启动所有服务（MySQL + Redis）"
    echo "  stop     - 停止所有服务"
    echo "  restart  - 重启所有服务"
    echo "  status   - 查看服务状态"
    echo "  logs     - 查看日志（可指定服务名：mysql 或 redis）"
    echo "  mysql    - 进入 MySQL 命令行"
    echo "  redis    - 进入 Redis 命令行"
    echo "  test     - 测试服务连接"
    echo ""
    exit 1
    ;;
esac

