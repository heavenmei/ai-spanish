import db from "@/db";
import * as schema from "./schema";

await db.insert(schema.wordBook).values([
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

await db.insert(schema.word).values({
  id: "1",
  word: "word",
  definition: "definition",
  translation: "translation",
});

await db.insert(schema.wordInBook).values({
  wordBookId: "1",
  wordId: "1",
  wordIndex: 1,
});

console.log("Seeding complete.");
