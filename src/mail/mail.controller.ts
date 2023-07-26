import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly correoService: MailService) {}

  @Post('enviar-correo')
  async enviarCorreoADocente(@Body() data: { id: string; correo: string }) {
    const { id, correo } = data;

    

    // Construye el contenido del correo que deseas enviar al docente
    const asuntoCorreo = '¡Recordatorio de evento!';
    const contenidoCorreo = `Estimado docente, recuerda que tienes un evento importante próximamente.`;

    try {
      console.log(correo)
      // Envía el correo utilizando el servicio de correo
      await this.correoService.enviarCorreo(correo, asuntoCorreo, contenidoCorreo);
      
      return { message: 'Correo enviado correctamente al docente' };
    } catch (error) {
      // Manejo de errores si ocurre algún problema en el envío del correo
      // Puedes lanzar una excepción personalizada o retornar un mensaje de error adecuado
      return { error: 'Error al enviar el correo al docente' };
    }
  }
}
