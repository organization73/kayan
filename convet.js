const fs = require("fs/promises");
const path = require("path");

const TARGET_DIR = "./images"; // change this to your images folder
const THRESHOLD_TIMESTAMP = 1777139439789;

// Matches filenames like: image-1777139439789-763784097-WhatsApp Image....jpg
// Captures the Date.now() timestamp right after the fieldname prefix.
const TIMESTAMP_REGEX = /^[a-zA-Z]+-(\d{10,13})-/;

async function main() {
  const files = await fs.readdir(TARGET_DIR);

  const jpgFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".jpg",
  );

  console.log(`Found ${jpgFiles.length} .jpg files\n`);

  let renamed = 0;
  let skippedOld = 0;
  let skippedNoMatch = 0;
  let skippedExists = 0;
  let failed = 0;

  for (const file of jpgFiles) {
    const match = file.match(TIMESTAMP_REGEX);

    if (!match) {
      console.log(`⚠️  No timestamp found in name, skipping: ${file}`);
      skippedNoMatch++;
      continue;
    }

    const fileTimestamp = Number(match[1]);

    if (fileTimestamp < THRESHOLD_TIMESTAMP) {
      skippedOld++;
      continue;
    }

    const oldPath = path.join(TARGET_DIR, file);
    const newName = path.parse(file).name + ".jpeg";
    const newPath = path.join(TARGET_DIR, newName);

    try {
      try {
        await fs.access(newPath);
        console.log(`⚠️  Skipped (already exists): ${newName}`);
        skippedExists++;
        continue;
      } catch {
        // doesn't exist, safe to rename
      }

      await fs.rename(oldPath, newPath);
      console.log(`✅ ${file} -> ${newName}`);
      renamed++;
    } catch (err) {
      console.log(`❌ Failed: ${file}\n   ${err.message}`);
      failed++;
    }
  }

  console.log("\n===========================");
  console.log("Finished");
  console.log("===========================");
  console.log(`Renamed (>= threshold)     : ${renamed}`);
  console.log(`Skipped (older timestamp)  : ${skippedOld}`);
  console.log(`Skipped (no timestamp)     : ${skippedNoMatch}`);
  console.log(`Skipped (target exists)    : ${skippedExists}`);
  console.log(`Failed                     : ${failed}`);
}

main().catch(console.error);
