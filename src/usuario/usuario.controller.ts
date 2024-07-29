import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { criaUsuarioDTO } from 'src/dto/criaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  //private usuarioRepository = new UsuarioRepository();
  constructor(private usuarioRepository: UsuarioRepository) { }

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: criaUsuarioDTO) {
    this.usuarioRepository.salvar(dadosDoUsuario);
    return { message: 'usuário criado!' };
  }

  @Get()
  async listUsuarios() {
    return this.usuarioRepository.listar();
  }
}
