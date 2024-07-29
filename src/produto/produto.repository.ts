import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutoRepository {
  private produto = []

  async salvar(produto) {
    this.produto.push(produto)
  }
}