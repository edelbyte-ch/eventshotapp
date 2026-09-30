-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "amountPaid" INTEGER,
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "discountAmount" INTEGER,
ADD COLUMN     "discountPercent" INTEGER,
ADD COLUMN     "finalPrice" INTEGER,
ADD COLUMN     "promotionId" TEXT,
ADD COLUMN     "promotionName" TEXT,
ADD COLUMN     "regularPrice" INTEGER;
