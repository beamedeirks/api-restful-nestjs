import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { criaUsuarioDTO } from 'src/dto/criaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListUsarioDTO } from 'src/dto/listUsuario.dto';
import { AtualizaUsuarioDTO } from 'src/dto/atualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  //private usuarioRepository = new UsuarioRepository();
  constructor(private usuarioRepository: UsuarioRepository) { }

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: criaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);

    return { usuario: new ListUsarioDTO(usuarioEntity.id, usuarioEntity.nome) };
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListUsarioDTO(
        usuario.id,
        usuario.nome
      )
    );
    return usuariosLista
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);

    return {
      usuario: usuarioAtualizado,
      mensagem: 'usuário atualizado com sucesso',
    }
  }


  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioRepository.remove(id);

    return {
      usuario: usuarioRemovido,
      mensagem: 'usuário removido com sucesso'
    }
  }

}

