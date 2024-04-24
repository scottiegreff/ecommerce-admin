/*
  Warnings:

  - You are about to drop the column `emplyeeId` on the `Hour` table. All the data in the column will be lost.
  - Added the required column `employeeId` to the `Hour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hour" DROP CONSTRAINT "Hour_employeeId_fkey";

-- AlterTable
ALTER TABLE "Hour" DROP COLUMN "emplyeeId",
ADD COLUMN     "employeeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Hour" ADD CONSTRAINT "Hour_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
