@echo off
chcp 65001 >nul
echo.
echo ╔══════════════════════════════════╗
echo ║     JOXOZP 一键更新上线        ║
echo ╚══════════════════════════════════╝
echo.
cd /d "C:\Users\Administrator\.easyclaw\workspace\joxozp"
echo 正在推送更新...
git add .
git commit -m "更新 %date% %time%"
git push origin main
echo.
echo ✅ 更新完成！1分钟后生效：
echo    https://zhangzihao866-ai.github.io/joxozp/
echo.
pause
