import nodemailer from 'nodemailer';

export function sendMail(data) {
    console.log (data)
    const { from, pass, to, subject, text, html } = data.body;
    
    if (!from || !pass || !to) {
        return null;
    } 
       console.log(from, pass)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: from,
            pass: pass
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
       
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            return false;
        } else {
            console.log('Correo electrónico enviado:', info.response);
            return true;

        }
    });
}
