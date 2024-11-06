import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/reclamo/5');
    await page.evaluate(() => {
        document.body.style.backgroundColor = 'lightblue';
    });


    await page.pdf({
        path: 'example.pdf',
        format: 'A4',
        printBackground: true
    });

    await browser.close();
})();