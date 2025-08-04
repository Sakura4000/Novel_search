@echo off
echo 正在启动小说助手...
echo.

REM 检查Node.js是否安装
node --version >nul 2>&1
if errorlevel 1 (
    echo 错误：未检测到Node.js，请先安装Node.js 18+
    pause
    exit /b 1
)

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo 正在安装依赖...
    npm install
    if errorlevel 1 (
        echo 依赖安装失败，请检查网络连接
        pause
        exit /b 1
    )
)

REM 启动开发服务器
echo 启动开发服务器...
echo 访问地址：http://localhost:3000
echo 按 Ctrl+C 停止服务器
echo.
npm run dev

pause 