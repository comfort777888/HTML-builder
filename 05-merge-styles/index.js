const path = require("path");
const fs = require("fs");

const createBundle = async () => {
  try {
    const files = await fs.promises.readdir(path.join(__dirname, "styles"), {
      withFileTypes: true,
    });
    const promises = files
      .filter((file) => file.isFile() && path.extname(file.name) === ".css")
      .map((file) => {
        const filePath = path.join(__dirname, "styles", file.name);
        const fileReadStream = fs.createReadStream(filePath);
        const outputFileStream = fs.createWriteStream(
          path.join(__dirname, "project-dist", "bundle.css"),
          { flags: "a" }
        );
        return new Promise((resolve, reject) => {
          fileReadStream.on("error", reject);
          outputFileStream.on("error", reject);
          outputFileStream.on("close", resolve);
          fileReadStream.pipe(outputFileStream, { end: false });
        });
      });

    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
};

createBundle();
