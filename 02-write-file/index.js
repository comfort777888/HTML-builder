const fs = require("fs");
const path = require("path");
const { stdout, stdin } = process;

const output = fs.createWriteStream(path.join(__dirname, "text.txt"));
stdout.write("Please type something\n");
stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    process.exit();
  }
  output.write(data);
});
process.on("exit", () => stdout.write("Good Luck!"));
process.on("SIGINT", () => process.exit());
