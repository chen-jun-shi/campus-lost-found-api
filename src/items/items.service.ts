import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateItemDto, publisherId: string) {
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
        images: dto.images ?? [],  // 👈 新增
        publisherId,
        status: 'published',
      },
      include: {
        publisher: { select: { id: true, name: true, avatar: true } },
      },
    });
  }

  async resolve(id: string) {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('信息不存在');

    return this.prisma.item.update({
      where: { id },
      data: { status: 'resolved' },
      include: {
        publisher: { select: { id: true, name: true, avatar: true } },
      },
    });
  }
}