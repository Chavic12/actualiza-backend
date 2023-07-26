import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAreaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
