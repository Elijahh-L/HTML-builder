const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'files');
const dirCopy = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.promises.rm(dirCopy, {
      recursive: true,
      force: true,
    });

    await fs.promises.mkdir(dirCopy, { recursive: true });

    const elements = await fs.promises.readdir(dir, { withFileTypes: true });
    elements.forEach((el) => {
      if (el.isFile()) {
        let pathFile = path.join(dir, el.name);
        let pathCopiedFile = path.join(dirCopy, el.name);
        fs.promises.copyFile(pathFile, pathCopiedFile);
        process.stdout.write(el.name + '\n');
      }
    });
  } catch (error) {
    console.error(error);
  }
}

copyDir();
