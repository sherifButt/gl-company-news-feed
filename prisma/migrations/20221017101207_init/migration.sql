-- CreateTable
CREATE TABLE "news_data" (
    "id" TEXT NOT NULL,
    "request_id" INTEGER NOT NULL,
    "companyname" TEXT NOT NULL,
    "url" TEXT,
    "insider" TEXT,
    "outsider" TEXT,
    "ceo" TEXT,
    "title" TEXT,
    "date" TIMESTAMP(3),
    "company_rel" INTEGER,
    "insider_rel" INTEGER,
    "outsider_rel" INTEGER,
    "ceo_rel" INTEGER,

    CONSTRAINT "news_data_pkey" PRIMARY KEY ("id")
);
