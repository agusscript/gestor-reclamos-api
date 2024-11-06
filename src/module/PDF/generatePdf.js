import express from 'express';
import puppeteer from 'puppeteer';

const router = express.Router();

router.get('/generate-pdf', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('http://localhost:3000/reclamo/5'); // Ajusta la URL 
        await page.evaluate(() => {
            document.body.style.backgroundColor = 'lightblue';
        });

        const pdfBuffer = await page.pdf({
            path: 'example.pdf',
            format: 'A4',
            printBackground: true
        });

        await browser.close();

        // Enviar el PDF como respuesta
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=example.pdf',
            'Content-Length': pdfBuffer.length
        });
        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el PDF');
    }
});

export default router;




