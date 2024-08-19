-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "genderId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepRecord" (
    "id" SERIAL NOT NULL,
    "hoursSlept" DOUBLE PRECISION NOT NULL,
    "date" DATE NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SleepRecord_pkey" PRIMARY KEY ("id")
);

-- Create Unique Index
CREATE INDEX "Gender_name_lower_idx" ON "Gender"(LOWER("name"));

-- Create Unique Index
CREATE INDEX "User_name_lower_idx" ON "User"(LOWER("name"));

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepRecord" ADD CONSTRAINT "SleepRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
