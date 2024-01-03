const fsP = require("fs/promises");

/** read file at path and print it out. */
async function cat(path) {
  let content;
  try {
    content = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
  console.log(content);
}

cat(process.argv[2]);