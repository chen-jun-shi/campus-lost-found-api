// src/items/items.controller.ts
import {
  Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateItemDto, @Req() req: any) {
    return this.itemsService.create(dto, req.user.id);
  }

  @Patch(':id/resolve')
  @UseGuards(JwtAuthGuard)
  resolve(@Param('id') id: string) {
    return this.itemsService.resolve(id);
  }

  // 👇 新增：删除
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.itemsService.remove(id, req.user.id);
  }
}