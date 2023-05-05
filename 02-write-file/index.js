const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const streamToWrite = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Nice to see u here! Start writing your text below:\n');

stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input === 'exit') {
    endProgramm();
  }
  streamToWrite.write(input + '\n');
  stdout.write(
    'Text was successfully added into text.txt file\nStart writing smth else below:\n'
  );
});

process.on('SIGINT', endProgramm);

function endProgramm() {
  stdout.write('Ok, see u later!\n');
  process.exit();
}
