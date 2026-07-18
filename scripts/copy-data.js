const { copyFileSync, mkdirSync, readdirSync } = require("node:fs");
const path = require("node:path");

const sourceDirectory = path.join(__dirname, "..", "src", "data");
const outputDirectory = path.join(__dirname, "..", "dist", "data");

mkdirSync(outputDirectory, { recursive: true });

for (const fileName of readdirSync(sourceDirectory)) {
  if (path.extname(fileName) === ".json") {
    copyFileSync(
      path.join(sourceDirectory, fileName),
      path.join(outputDirectory, fileName)
    );
  }
}
