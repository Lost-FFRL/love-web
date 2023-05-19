const puppeteer = require('puppeteer');
const fs = require('fs');

async function screenshot(path, url) {
    // 启动一个新的浏览器实例
    const browser = await puppeteer.launch();
    //const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blacklist', '--use-gl=swiftshader'] });

    // 打开一个新的页面
    const page = await browser.newPage();
    // 设置页面视口大小为300x300
    await page.setViewport({ width: 300, height: 300 });
    // 导航到指定的URL
    await page.goto(url);
    // 等待2秒
    await page.waitForTimeout(2000);
    // 生成截图并保存到指定的路径
    await page.screenshot({ path: path, clip: { x: 0, y: 0, width: 300, height: 300 } });

    // 关闭浏览器
    await browser.close();
}

// 读取文件内容
const fileContent = fs.readFileSync(process.argv[2], 'utf-8');

// 按行分割文件内容
const lines = fileContent.split('\n');

// 处理每一行
for (const line of lines) {
    // 忽略空行
    if (line.trim() === '') continue;

    // 按逗号分割行内容
    const [path, url] = line.split(',');

    // 调用函数
    screenshot(path.trim(), url.trim());
}
