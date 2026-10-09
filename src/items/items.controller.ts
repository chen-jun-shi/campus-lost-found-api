// src/items/items.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('api/items')  // 路由前缀：/api/items
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // GET /api/items
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  // GET /api/items/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }
}