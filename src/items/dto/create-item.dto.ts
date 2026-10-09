// src/items/dto/create-item.dto.ts
import {
  IsEnum, IsString, MinLength, MaxLength, IsOptional, IsDateString, IsArray,
} from 'class-validator';

export enum ItemType {
  lost = 'lost',
  found = 'found',
}

export enum ItemCategory {
  card = 'card',
  phone = 'phone',
  wallet = 'wallet',
  book = 'book',
  key = 'key',
  clothing = 'clothing',
  other = 'other',
}

export class CreateItemDto {
  @IsEnum(ItemType, { message: 'type 必须是 lost 或 found' })
  type: ItemType;

  @IsString()
  @MinLength(2, { message: '标题至少 2 个字' })
  @MaxLength(50, { message: '标题最多 50 个字' })
  title: string;

  @IsEnum(ItemCategory, { message: '分类不合法' })
  category: ItemCategory;

  @IsString()
  @MinLength(5, { message: '描述至少 5 个字' })
  @MaxLength(500)
  description: string;

  @IsString()
  @MinLength(2)
  location: string;

  @IsDateString({}, { message: '时间格式不合法' })
  happenTime: string;

  @IsString()
  @MinLength(1, { message: '请填写联系人姓名' })
  contactName: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  contactWechat?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}