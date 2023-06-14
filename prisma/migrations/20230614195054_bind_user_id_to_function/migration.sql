-- AlterTable
ALTER TABLE "post" ALTER COLUMN "user_id" SET DEFAULT requesting_user_id();
