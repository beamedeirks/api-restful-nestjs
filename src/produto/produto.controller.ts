import { Body, Controller, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) { }

  @Post()
  async criaProduto(@Body() dadosDoProduto) {
    this.produtoRepository.salvar(dadosDoProduto);
    return { message: 'produto criado!' }
  }
}