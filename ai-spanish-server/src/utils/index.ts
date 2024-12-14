import dotenv from "dotenv";

export * from "./types";

dotenv.config();
export const serverEnvs = process.env as any;

export function generateUUID() {
  let d = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

export function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() 返回 0-11，表示 1-12 月
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
