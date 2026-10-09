import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2, { message: '名字至少 2 个字' })
  @MaxLength(20)
  name: string;

  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsString()
  @MinLength(6, { message: '密码至少 6 位' })
  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;
}