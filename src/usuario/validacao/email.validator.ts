import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) { }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const usuarioExiste = await this.usuarioRepository.existeEmail(value)
    return !usuarioExiste;
  }

}

export const EmailUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailValidator
    })
  }
}