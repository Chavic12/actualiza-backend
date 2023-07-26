import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  async enviarCorreo(destinatario: string, asunto: string, contenido: string): Promise<void> {
    // Configuración del servicio de correo (Gmail en este caso, pero puedes usar otro proveedor)
    const transporter = createTransport({
      service: 'Gmail',
      auth: {
        user: 'xavierchavez916@gmail.com', // Cambiar por el correo electrónico desde el cual enviarás los correos
        pass: 'omcrogtfcxldjxne', // Cambiar por la contraseña del correo electrónico
      },
    });

    // Configuración del mensaje de correo
    const mensajeCorreo = {
      from: 'xavierchavez916@gmail.com', // Cambiar por el correo electrónico desde el cual enviarás los correos
      to: destinatario,
      subject: asunto,
      text: contenido,
    };

    try {
      // Envío del correo
      await transporter.sendMail(mensajeCorreo);
    } catch (error) {
      // Manejo de errores si ocurre algún problema en el envío del correo
      // Puedes lanzar una excepción personalizada o manejar el error de acuerdo a tus necesidades
      console.error('Error al enviar el correo:', error.message);
      throw new Error('Error al enviar el correo al docente');
    }
  }
}
