import db from "@/db";
import * as schema from "./schema";

import wordBooks from "../../public/wordBooks.json";
await db.insert(schema.wordBook).values(wordBooks);

import DELE_A1 from "../../public/DELE_A1/DELE_A1.json";
import DELE_A1_inBook from "../../public/DELE_A1/DELE_A1_inBook.json";

await db.insert(schema.word).values(DELE_A1);
await db.insert(schema.wordInBook).values(DELE_A1_inBook);

import modernSpanish1 from "../../public/modernSpanish1/modernSpanish1.json";
import modernSpanish1_inBook from "../../public/modernSpanish1/modernSpanish1_inBook.json";
await db.insert(schema.word).values(modernSpanish1);
await db.insert(schema.wordInBook).values(modernSpanish1_inBook);

console.log("Seeding complete.");
