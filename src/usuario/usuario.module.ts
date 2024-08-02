import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailValidator } from "./validacao/email.validator";

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository, EmailValidator]
})
export class UsuarioModule { }