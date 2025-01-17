import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "src/usuario/validacao/email.validator";

export class criaUsuarioDTO {

  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  nome: string;

  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @EmailUnico({ message: 'Já existe um usuário com esse email' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string
}