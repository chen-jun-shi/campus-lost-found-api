-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('lost', 'found');

-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('card', 'phone', 'wallet', 'book', 'key', 'clothing', 'other');

-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('pending', 'published', 'resolved', 'rejected');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "wechat" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "title" TEXT NOT NULL,
    "category" "ItemCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "location" TEXT NOT NULL,
    "happenTime" TIMESTAMP(3) NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactPhone" TEXT,
    "contactWechat" TEXT,
    "status" "ItemStatus" NOT NULL DEFAULT 'published',
    "views" INTEGER NOT NULL DEFAULT 0,
    "isTop" BOOLEAN NOT NULL DEFAULT false,
    "bounty" INTEGER,
    "publisherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "items_type_status_idx" ON "items"("type", "status");

-- CreateIndex
CREATE INDEX "items_category_idx" ON "items"("category");

-- CreateIndex
CREATE INDEX "items_publisherId_idx" ON "items"("publisherId");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
