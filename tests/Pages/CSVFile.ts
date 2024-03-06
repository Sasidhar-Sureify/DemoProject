//CSV File Path and Declaration for Sign In Screen
import fs from "fs";
import path from "path";

const root_dir = process.cwd();
console.log(root_dir);
export let fileSep = path.sep;
console.log(fileSep);
export const testDataFolder: string =
  root_dir +
  fileSep +
  "tests" +
  fileSep +
  "CSVFiles";
console.log("Directory in Common Base: ", testDataFolder);

 export const LCData: string = testDataFolder + fileSep + "LCCreation.csv";
 export const LC_csvFilePath = path.resolve(__dirname, LCData);
 export const LC_fileContent = fs.readFileSync(LC_csvFilePath, {
  encoding: "utf-8",
});

