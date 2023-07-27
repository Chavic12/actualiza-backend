import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { Evento } from 'src/docentes/entities/evento.entity';

@Controller('mail')
export class MailController {
  constructor(private readonly correoService: MailService) {}

  @Post('enviar-correo')
  async enviarCorreoADocente(@Body() data: { id: number; correo: string; idEvento: number }) {
    const { id, correo, idEvento } = data;

    // Construye la URL de la página de información del evento
    const urlEvento = `http://localhost:4200/admin/infoEventos/${idEvento}`;

    // Construye el contenido HTML del correo que deseas enviar al docente
    const contenidoHTML = `
      Estimado docente, recuerda que tienes un evento importante próximamente.
      Puedes ver más información del evento en el siguiente enlace: ${urlEvento}.
    `;

    try {
      // Envía el correo utilizando el servicio de correo
      await this.correoService.enviarCorreo(correo, '¡Recordatorio de evento!', contenidoHTML);
     

      return { message: 'Correo enviado correctamente al docente' };
    } catch (error) {
      // Manejo de errores si ocurre algún problema en el envío del correo
      // Puedes lanzar una excepción personalizada o retornar un mensaje de error adecuado
      
      return { error: 'Error al enviar el correo al docente' };
    }
  }
}
