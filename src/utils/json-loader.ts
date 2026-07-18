import { readFile } from "node:fs/promises";
import path from "node:path";

const dataDirectory = path.join(__dirname, "..", "data");

export const loadJsonFile = async <T>(fileName: string): Promise<T> => {
  const filePath = path.join(dataDirectory, fileName);
  const fileContent = await readFile(filePath, "utf8");
  const parsedJson = JSON.parse(fileContent) as unknown;

  return parsedJson as T;
};
