// const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');
const { stdout } = process;

(async function findFilesInfo() {
  const files = await fs.promises.readdir(
    path.join(__dirname, 'secret-folder'),
    { withFileTypes: true }
  );
  files
    .filter((el) => el.isFile())
    .forEach(async (el) => {
      const stats = await fs.promises.stat(
        path.join(__dirname, 'secret-folder', el.name)
      );
      stdout.write(
        `${el.name.split('.')[0]} ${path.extname(el.name)} ${Math.round(
          stats.size / 1000
        )}kb\n`
      );
    });
})();
