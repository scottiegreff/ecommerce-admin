/*
  Warnings:

  - You are about to drop the column `hours` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "hours";

-- CreateTable
CREATE TABLE "Hours" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "emplyeeId" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Hours_storeId_idx" ON "Hours"("storeId");

-- AddForeignKey
ALTER TABLE "Hours" ADD CONSTRAINT "Hours_emplyeeId_fkey" FOREIGN KEY ("emplyeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hours" ADD CONSTRAINT "Hours_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
