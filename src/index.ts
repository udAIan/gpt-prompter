import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, '../host/src');
const outputFilePath = path.join(directoryPath, 'prompt.gen.ts');

// Ensure the directory exists
fs.mkdir(directoryPath, { recursive: true }, (err) => {
  if (err) {
    return console.error('Unable to create directory: ' + err);
  }

  // Read all files in the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error('Unable to scan directory: ' + err);
    }

    let prompter: Record<string, any> = {};

    // Filter and read .md files
    files
      .filter((file) => path.extname(file) === '.md')
      .forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        prompter[path.parse(file).name] = fileContent;
      });

    fs.writeFile(
      outputFilePath,
      `export const prompter = ${JSON.stringify(prompter, null, 2)} as const`,
      (err) => {
        if (err) {
          return console.error('Unable to write to file: ' + err);
        }
        console.log('Prompter has been written to ' + outputFilePath);
      },
    );
  });
});
