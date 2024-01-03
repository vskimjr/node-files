const fsP = require("fs/promises");

/** handle output: write to file if out given, else print */

async function write(text, path) {
  try {
    await fsP.writeFile(outPathOrUndef, text, "utf8");
  } catch (err) {
    console.error(`Couldn't write ${outPathOrUndef}: ${err}`);
    process.exit(1);
  }
}

/** read file at path and return it. */

async function cat(path, out) {
  try {
    return await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

/** read page at URL and return it. */

async function webCat(url, out) {
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
  return await resp.text();
}

/** Do file/web reading and logging/writing. */

async function catOrWebCat(path, outPathOrUndef) {
  let content = path.startsWith("http")
      ? await webCat(path, outPathOrUndef)
      : await cat(path, outPathOrUndef);
  if (outPathOrUndef) {
    await write(content, outPathOrUndef);
  } else {
    console.log(content);
  }
}

let path;
let outPathOrUndef;

if (process.argv[2] === "--out") {
  outPathOrUndef = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

catOrWebCat(path, outPathOrUndef);
