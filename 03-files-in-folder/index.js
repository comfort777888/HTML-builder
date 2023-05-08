const fs = require("fs").promises;
const path = require("path");

async function filesList() {
  const files = await fs.readdir(path.join(__dirname, "secret-folder"));
  for (const file of files) {
    const stat = await fs.stat(path.join(__dirname, "secret-folder", file));
    if (stat.isFile()) {
      const ext = path.extname(file).substring(1);
      const fileName = path.basename(file, `.${ext}`);
      const sizeInKb = stat.size / 1024;
      console.log(`${fileName} - ${ext} - ${sizeInKb}kb`);
    }
  }
}
filesList();
