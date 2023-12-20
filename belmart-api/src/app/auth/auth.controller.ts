import {Body, Controller, HttpCode, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {AuthUserDto} from "../../domain/auth-user.dto";
import {RefreshTokenDto} from "../../domain/refresh-token.dto";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({description: "User's registration"})
  @ApiOkResponse({
    description: "User successfully registered",
    schema: {
      example: {
        user: {},
        accessToken: `accessToken string`,
        refreshToken: `refreshToken string`
      }
    }
  })
  @ApiBadRequestResponse({
    description: "User's registration failed",
    schema: {
      example: {
        statusCode: 400,
        message: "User already exists!",
        error: "Bad Request"
      }
    }
  })
  @HttpCode(200)
  @Post('signup')
  async signup(
    @Body() authUserDto: AuthUserDto
  ) {
    return this.authService.signup(authUserDto)
  }

  @ApiOperation({description: "User's login"})
  @ApiOkResponse({
    description: "User successfully logged in",
    schema: {
      example: {
        user: {},
        accessToken: `accessToken string`,
        refreshToken: `refreshToken string`
      }
    }
  })
  @ApiNotFoundResponse({
    description: "User's login failed",
    schema: {
      example: {
        statusCode: 404,
        message: "Invalid credentials!",
        error: "Not found"
      }
    }
  })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() authUserDto: AuthUserDto
  ) {
    return this.authService.login(authUserDto)
  }

  @ApiOperation({description: "User's refresh tokens"})
  @ApiOkResponse({
    description: "Tokens refreshed successfuly",
    schema: {
      example: {
        user: {},
        accessToken: `accessToken string`,
        refreshToken: `refreshToken string`
      }
    }
  })
  @ApiNotFoundResponse({
    description: "Token refresh failed",
    schema: {
      example: {
        statusCode: 403,
        message: "Invalid Refresh token!",
        error: "Unauthorized"
      }
    }
  })
  @HttpCode(200)
  @Post('refresh-tokens')
  async refreshTokens(
    @Body() refreshTokenDto: RefreshTokenDto
  ) {
    return this.authService.refreshTokens(refreshTokenDto)
  }
}
