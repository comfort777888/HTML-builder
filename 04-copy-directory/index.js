const fs = require("fs").promises;
const path = require("path");

async function copyDir() {
  const copyFrom = path.join(__dirname, "files");
  const destinationFolder = path.join(__dirname, "files-copy");
  try {
    await fs.access(destinationFolder, fs.constants.F_OK);
  } catch (err) {
    await fs.mkdir(destinationFolder, { recursive: true });
  }
  const files = await fs.readdir(copyFrom, { withFileTypes: true });
  for (let file of files) {
    const filePath = path.join(copyFrom, file.name);
    const destinationPath = path.join(destinationFolder, file.name);
    if (file.isDirectory()) {
      await copyDir(filePath, destinationPath);
    } else {
      await fs.copyFile(filePath, destinationPath);
    }
  }
  const destinationFiles = await fs.readdir(destinationFolder, {
    withFileTypes: true,
  });
  for (let file of destinationFiles) {
    const destFilePath = path.join(destinationFolder, file.name);
    if (!files.some((f) => f.name === file.name)) {
      if (file.isDirectory()) {
        await fs.rmdir(destFilePath, { recursive: true });
      } else {
        await fs.unlink(destFilePath);
      }
    }
  }
}
copyDir();
