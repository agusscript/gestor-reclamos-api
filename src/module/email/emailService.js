export default class EmailService {
  constructor(service) {
    this.service = service;
  }

  async send(from, to, subject, text) {
    const transporter = await this.service.createTransport({
      service: 'Gmail',
      auth: {
        user: from,
        pass: process.env.EMAIL_APP_PASS
      }
    });

    const mailOptions = {
      from,
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
      } else {
        console.log('Correo electrónico enviado:', info.response);
      }
    });
  }
}