-- CreateEnum
CREATE TYPE "FoodLogStatuses" AS ENUM ('DRAFT', 'SUBMITTED', 'DELETED');

-- CreateEnum
CREATE TYPE "StripeSubscriptionStatuses" AS ENUM ('ACTIVE', 'CANCELED', 'INCOMPLETE', 'INCOMPLETE_EXPIRED', 'PAST_DUE', 'TRIALING', 'UNPAID');

-- CreateEnum
CREATE TYPE "Units" AS ENUM ('CUP', 'TABLESPOON', 'TEASPOON', 'OUNCE', 'POUND', 'GRAM', 'LITER', 'GALLON', 'QUART', 'PINT', 'SLICE', 'GLASS', 'CAN', 'SERVING', 'HANDFUL', 'FISTFUL', 'PINCH', 'DASH', 'STICK', 'DROP', 'PIECE', 'SPLASH', 'DRIZZLE', 'SHOT', 'BOTTLE', 'BAR', 'TABLET', 'SQUARE', 'NONE');

-- CreateEnum
CREATE TYPE "PreparationMethods" AS ENUM ('STEAMED', 'BOILED', 'FRIED', 'AIR_FRIED', 'BAKED', 'RAW', 'GRILLED', 'SAUTEED', 'ROASTED', 'POACHED', 'BROILED', 'MICROWAVED', 'MARINATED', 'PICKLED', 'SMOKED', 'BRAISED', 'STEWED', 'COOKED', 'PRESSURE_COOKED', 'SLOW_COOKED', 'FERMENTED', 'CANNED', 'DEHYDRATED', 'FREEZE_DRIED', 'DRIED', 'CURED', 'SALTED', 'SUGARED', 'CANDIED', 'JAMMED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripeSubscriptionStatus" "StripeSubscriptionStatuses",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdByUserId" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodLogItem" (
    "id" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "foodLogId" TEXT NOT NULL,
    "preparation" "PreparationMethods" NOT NULL DEFAULT 'RAW',
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "unit" "Units" NOT NULL DEFAULT 'NONE',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodLogItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "image" TEXT,
    "logTime" TIMESTAMP(3),
    "status" "FoodLogStatuses" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'unnamed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateFoodLogItem" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "preparation" "PreparationMethods" NOT NULL DEFAULT 'RAW',
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "unit" "Units" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplateFoodLogItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sleepQuality" INTEGER NOT NULL,
    "workoutQuality" INTEGER NOT NULL,
    "poopQuality" INTEGER NOT NULL,
    "moodQuality" INTEGER NOT NULL,
    "anxietyQuality" INTEGER NOT NULL,

    CONSTRAINT "DailyLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLogSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isTrackingWorkout" BOOLEAN NOT NULL DEFAULT true,
    "isTrackingPoop" BOOLEAN NOT NULL DEFAULT true,
    "isTrackingMood" BOOLEAN NOT NULL DEFAULT true,
    "isTrackingAnxiety" BOOLEAN NOT NULL DEFAULT true,
    "isTrackingSleep" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLogSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FoodItemToFoodLog" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodItemToFoodLog_AB_unique" ON "_FoodItemToFoodLog"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodItemToFoodLog_B_index" ON "_FoodItemToFoodLog"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodItem" ADD CONSTRAINT "FoodItem_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLogItem" ADD CONSTRAINT "FoodLogItem_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLogItem" ADD CONSTRAINT "FoodLogItem_foodLogId_fkey" FOREIGN KEY ("foodLogId") REFERENCES "FoodLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateFoodLogItem" ADD CONSTRAINT "TemplateFoodLogItem_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateFoodLogItem" ADD CONSTRAINT "TemplateFoodLogItem_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyLog" ADD CONSTRAINT "DailyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLogSettings" ADD CONSTRAINT "UserLogSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodItemToFoodLog" ADD CONSTRAINT "_FoodItemToFoodLog_A_fkey" FOREIGN KEY ("A") REFERENCES "FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodItemToFoodLog" ADD CONSTRAINT "_FoodItemToFoodLog_B_fkey" FOREIGN KEY ("B") REFERENCES "FoodLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
