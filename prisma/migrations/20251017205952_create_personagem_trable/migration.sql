-- CreateTable
CREATE TABLE "Personagem" (
    "id" SERIAL NOT NULL,
    "api_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,

    CONSTRAINT "Personagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personagem_api_id_key" ON "Personagem"("api_id");
