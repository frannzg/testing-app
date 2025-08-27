-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailVerified" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "public"."User"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
