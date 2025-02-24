import db from "@/db";
import * as schema from "./schema";

import wordBooks from "../../public/wordBooks.json";
await db.insert(schema.wordBook).values(wordBooks).onConflictDoNothing();

import DELE_A1 from "../../public/DELE_A1/DELE_A1.json";
import DELE_A1_inBook from "../../public/DELE_A1/DELE_A1_inBook.json";
await db.insert(schema.word).values(DELE_A1);
await db.insert(schema.wordInBook).values(DELE_A1_inBook);

import modernSpanish1 from "../../public/modernSpanish1/modernSpanish1.json";
import modernSpanish1_inBook from "../../public/modernSpanish1/modernSpanish1_inBook.json";
await db.insert(schema.word).values(modernSpanish1);
await db.insert(schema.wordInBook).values(modernSpanish1_inBook);

import modernSpanish2 from "../../public/modernSpanish2/modernSpanish2.json";
import modernSpanish2_inBook from "../../public/modernSpanish2/modernSpanish2_inBook.json";
await db.insert(schema.word).values(modernSpanish2);
await db.insert(schema.wordInBook).values(modernSpanish2_inBook);

import NewMiddleSchool from "../../public/NewMiddleSchool/NewMiddleSchool.json";
import NewMiddleSchool_inBook from "../../public/NewMiddleSchool/NewMiddleSchool_inBook.json";
await db.insert(schema.word).values(NewMiddleSchool);
await db.insert(schema.wordInBook).values(NewMiddleSchool_inBook);

import middleSchoolStandard from "../../public/middleSchoolStandard/middleSchoolStandard.json";
import middleSchoolStandard_inBook from "../../public/middleSchoolStandard/middleSchoolStandard_inBook.json";
await db.insert(schema.word).values(middleSchoolStandard);
await db.insert(schema.wordInBook).values(middleSchoolStandard_inBook);

console.log("Seeding complete.");
