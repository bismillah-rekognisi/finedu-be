-- CreateEnum
CREATE TYPE "public"."TargetStatusType" AS ENUM ('Going', 'Achieved');

-- CreateTable
CREATE TABLE "public"."targets" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "achievedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deadlineDate" TIMESTAMP(3) NOT NULL,
    "status" "public"."TargetStatusType" NOT NULL DEFAULT 'Going',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "targets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."targets" ADD CONSTRAINT "targets_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "public"."businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
