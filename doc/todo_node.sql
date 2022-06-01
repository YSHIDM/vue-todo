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

 Date: 30/12/2020 16:23:35
*/


-- ----------------------------
-- Table structure for todo_node
-- ----------------------------
DROP TABLE IF EXISTS "public"."todo_node";
CREATE TABLE "public"."todo_node" (
  "id" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "alias" varchar(10) COLLATE "pg_catalog"."default",
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamp(6)
)
;
ALTER TABLE "public"."todo_node" OWNER TO "postgres";

-- ----------------------------
-- Records of todo_node
-- ----------------------------
BEGIN;
INSERT INTO "public"."todo_node" VALUES ('TDND002', 'inProgress', '进行中', '进行', NULL, '2020-12-28 18:38:21', NULL, '2020-12-29 10:42:42.032');
INSERT INTO "public"."todo_node" VALUES ('TDND003', 'testing', '测试中', '测试', NULL, '2020-12-28 18:38:25', NULL, '2020-12-29 10:42:49.861');
INSERT INTO "public"."todo_node" VALUES ('TDND004', 'done', '已完成', '完成', NULL, '2020-12-28 18:38:28', NULL, '2020-12-29 10:44:38.282');
INSERT INTO "public"."todo_node" VALUES ('TDND001', 'plan', '待办', '计划', NULL, '2020-12-28 18:38:12', NULL, '2020-12-30 15:53:14.357');
COMMIT;

-- ----------------------------
-- Primary Key structure for table todo_node
-- ----------------------------
ALTER TABLE "public"."todo_node" ADD CONSTRAINT "todo_Node_pkey" PRIMARY KEY ("id");
