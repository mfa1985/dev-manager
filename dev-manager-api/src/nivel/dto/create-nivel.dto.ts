import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateNivelDto {

    @ApiProperty({ example: "Pleno", description: "Níveis do desenvolvedor" })
    nivel: string;

}
