/*
  Warnings:

  - You are about to drop the column `username` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username_canonical,tag]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username_canonical` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username_display` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Usuario_username_tag_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "username",
ADD COLUMN     "username_canonical" TEXT NOT NULL,
ADD COLUMN     "username_display" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UsuarioPersonagemFavorito" (
    "usuario_id" UUID NOT NULL,
    "personagem_id" INTEGER NOT NULL,
    "adicionado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsuarioPersonagemFavorito_pkey" PRIMARY KEY ("usuario_id","personagem_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_canonical_tag_key" ON "Usuario"("username_canonical", "tag");

-- AddForeignKey
ALTER TABLE "UsuarioPersonagemFavorito" ADD CONSTRAINT "UsuarioPersonagemFavorito_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioPersonagemFavorito" ADD CONSTRAINT "UsuarioPersonagemFavorito_personagem_id_fkey" FOREIGN KEY ("personagem_id") REFERENCES "Personagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
