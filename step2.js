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

/** read page at URL and print it out. */

async function webCat(url) {
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
  console.log(await resp.text());
}

let path = process.argv[2];

let resultPromise = path.startsWith("http")
    ? webCat(path)
    : cat(path);