const fs = require("fs");
const path = require("path");

const importStatement = `
import {
  AIMOMENT_STORE_CN_PACKAGE,
} from "../constant";
`;

const directoryPath = path.join(__dirname, "./"); // 修改为翻译文件所在目录

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (path.extname(file) === ".ts") {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return console.log(err);
        }

        if (!data.includes("AIMOMENT_GCODE")) {
          const result = importStatement + data;
          fs.writeFile(filePath, result, "utf8", (err) => {
            if (err) return console.log(err);
          });
        }
      });
    }
  });
});
