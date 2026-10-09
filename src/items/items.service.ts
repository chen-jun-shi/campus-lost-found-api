// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  // 获取所有信息列表
  async findAll() {
    return this.prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        publisher: {
          select: { id: true, name: true, avatar: true },
        },
      },
    });
  }

  // 获取单条信息详情
  async findOne(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      include: {
        publisher: {
          select: { id: true, name: true, avatar: true },
        },
      },
    });
  }
}