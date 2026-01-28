import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { AuthRequestDto } from "./dto/auth-request.dto";

@Controller('/auth')
export class AuthController {

    constructor( private readonly authService: AuthService ) {}

    @Post()
    authorization(@Body() authRequestDto: AuthRequestDto) {
        return this.authService.authorize(authRequestDto);
    }
}