@echo off
chcp 65001 >nul
echo.
echo ╔══════════════════════════════════╗
echo ║     JOXOZP 一键发布上线        ║
echo ╚══════════════════════════════════╝
echo.
echo 正在部署到 Netlify...
echo.
cd /d C:\Users\Administrator\.easyclaw\workspace\joxozp
netlify deploy --dir="C:\Users\Administrator\.easyclaw\workspace\joxozp" --prod
echo.
echo ──────────────────────────────────
echo 部署完成！网站地址：
echo https://joxozp.netlify.app
echo ──────────────────────────────────
echo.
pause
