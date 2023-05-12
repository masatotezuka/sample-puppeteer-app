import core from "puppeteer-core";

const getHTML = (text: string) => {
  return `<!DOCTYPE html>
  <html>
  <meta charset="utf-8">
  <title>Generated Image</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
      .container {
          position: relative;
      }
      .center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 30px;
      }
      #bg-img {
          width: 1200px;
          height: 630px;
      }
  </style>
  <body>
      <div class="container">
          <div class="center">${text}</div>
          <img id='bg-img'
              src='path-to-background-image'>
      </div>
  </body>
  </html>
  `;
};
(async () => {
  const browser = await core.launch({
    //画面表示するか否か
    headless: true,
    // slowMo: 500,
    //Macで指定
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const viewport = {
    width: 1000,
    height: 500,
  };

  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.setContent(getHTML("test"));
  const file = await page.screenshot({ path: "public/test.png" });
  console.log(file);
})();
