/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : PostgreSQL
 Source Server Version : 120004
 Source Host           : localhost:5434
 Source Catalog        : test
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120004
 File Encoding         : 65001

 Date: 30/12/2020 16:23:23
*/


-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS "public"."todo";
CREATE TABLE "public"."todo" (
  "id" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "content" varchar(100) COLLATE "pg_catalog"."default",
  "node" varchar(10) COLLATE "pg_catalog"."default" NOT NULL,
  "isArchive" bool NOT NULL,
  "isClose" bool NOT NULL,
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamp(6),
  "history" jsonb
)
;
ALTER TABLE "public"."todo" OWNER TO "postgres";

-- ----------------------------
-- Primary Key structure for table todo
-- ----------------------------
ALTER TABLE "public"."todo" ADD CONSTRAINT "todo_pkey" PRIMARY KEY ("id");
