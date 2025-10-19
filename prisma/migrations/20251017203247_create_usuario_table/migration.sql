-- CreateTable
CREATE TABLE "Usuario" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "tag" CHAR(4) NOT NULL,
    "perfil_publico" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_tag_key" ON "Usuario"("username", "tag");
