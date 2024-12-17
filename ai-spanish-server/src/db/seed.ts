import db from "@/db";
import * as schema from "./schema";

await db.insert(schema.wordBook).values([
  {
    id: "-1",
  },
  {
    id: "1",
    name: "普通高中西班牙语课程标准",
    description: "普通高中西班牙语课程标准",
    total: 100,
    tag: "高中",
    cover:
      "https://spanish-hhw.oss-cn-shanghai.aliyuncs.com/system/ModernSpanish.jpg",
  },
  {
    id: "2",
    name: "普通高中西班牙语课程标准222",
    description: "普通高中西班牙语课程标准222",
    total: 100,
    tag: "高中",
    cover:
      "https://spanish-hhw.oss-cn-shanghai.aliyuncs.com/system/ModernSpanish.jpg",
  },
]);

await db.insert(schema.word).values([
  {
    id: "1",
    pos: "adj.",
    word: "gordo",
    definition: "definition",
    translation: "胖的",
  },
  {
    id: "2",
    pos: "adj.",
    word: "delgado",
    definition: "definition",
    translation: "瘦的",
  },
  {
    id: "3",
    pos: "adj.",
    word: "alto",
    definition: "definition",
    translation: "高的",
  },
  {
    id: "4",
    pos: "m.",
    word: "pelo",
    definition: "definition",
    translation: "头发, 毛发",
  },
  {
    id: "5",
    pos: "m.",
    word: "ojo",
    definition: "definition",
    translation: "眼睛",
  },
]);

await db.insert(schema.wordInBook).values([
  {
    wb_id: "1",
    word_id: "1",
    word_index: 1,
  },
  {
    wb_id: "1",
    word_id: "2",
    word_index: 1,
  },
  {
    wb_id: "1",
    word_id: "3",
    word_index: 1,
  },
  {
    wb_id: "1",
    word_id: "4",
    word_index: 1,
  },
  {
    wb_id: "1",
    word_id: "5",
    word_index: 1,
  },
]);

console.log("Seeding complete.");
