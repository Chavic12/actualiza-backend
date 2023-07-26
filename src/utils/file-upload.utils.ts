import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  // Lógica para generar un nuevo nombre de archivo único
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  const fileExtName = extname(file.originalname);
  callback(null, `${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  // Verifica si el archivo es una imagen
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Solo se permiten imágenes (jpg, jpeg, png o gif)'), false);
  }
  callback(null, true);
};

export const diskStorageOptions = {
  destination: './uploads',
  filename: (req, file, callback) => {
    // Lógica para generar un nuevo nombre de archivo único
    const randomName = uuidv4(); // Utilizamos uuidv4 para generar un nombre único
    const fileExtName = extname(file.originalname);
    const newFileName = `${randomName}${fileExtName}`;
    callback(null, newFileName);
  },
};