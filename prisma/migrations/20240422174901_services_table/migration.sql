/*
  Warnings:

  - Added the required column `serviceId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Service_storeId_idx" ON "Service"("storeId");

-- CreateIndex
CREATE INDEX "Service_categoryId_idx" ON "Service"("categoryId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
