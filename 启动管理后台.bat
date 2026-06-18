@echo off
chcp 65001 >nul
echo.
echo ╔══════════════════════════════════════╗
echo ║       JOXOZP 管理后台             ║
echo ╚══════════════════════════════════════╝
echo.
echo 后台地址: http://localhost:3456
echo 网站预览: http://localhost:3456/index.html
echo.
echo 按 Ctrl+C 关闭服务器
echo.
cd /d "C:\Users\Administrator\.easyclaw\workspace\joxozp\admin"
node server.js
pause
