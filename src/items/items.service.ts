// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        publisher: { select: { id: true, name: true, avatar: true } },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      include: {
        publisher: { select: { id: true, name: true, avatar: true } },
      },
    });
  }

  async create(dto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        type: dto.type,
        title: dto.title,
        category: dto.category,
        description: dto.description,
        location: dto.location,
        happenTime: new Date(dto.happenTime),
        contactName: dto.contactName,
        contactPhone: dto.contactPhone,
        contactWechat: dto.contactWechat,
        publisherId: dto.publisherId,
        status: 'published',
      },
      include: {
        publisher: { select: { id: true, name: true, avatar: true } },
      },
    });
  }
}