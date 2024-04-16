/*
  Warnings:

  - You are about to drop the `Hours` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hours" DROP CONSTRAINT "Hours_emplyeeId_fkey";

-- DropForeignKey
ALTER TABLE "Hours" DROP CONSTRAINT "Hours_storeId_fkey";

-- DropTable
DROP TABLE "Hours";

-- CreateTable
CREATE TABLE "Hour" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "emplyeeId" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Hour_storeId_idx" ON "Hour"("storeId");

-- AddForeignKey
ALTER TABLE "Hour" ADD CONSTRAINT "Hour_emplyeeId_fkey" FOREIGN KEY ("emplyeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hour" ADD CONSTRAINT "Hour_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
