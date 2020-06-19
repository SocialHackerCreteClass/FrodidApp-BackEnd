const fs = require('fs');

const executeQueryFile = (pool, path, filename) => {
  console.log('working');
  const fileAddress = path + filename;
  const fileLines = fs.readFileSync(fileAddress).toString().split('\n');
  const clearedLines = [];
  const queries = [];

  // Eliminates all comments in the file
  fileLines.forEach((line) => {
    const newLine = line.replace(/[\n\r]/g, ''); // replaces carriage returns with empty strings
    if (
      !newLine.includes('*')
      && !newLine.includes('-')
      && newLine.length > 0
    ) {
      clearedLines.push(newLine);
    }
  });

  let partialQuery = '';

  // Extracts the queries and place them in an array
  clearedLines.forEach((line) => {
    partialQuery += line;
    if (line.charAt(line.length - 1) === ';') {
      queries.push(partialQuery);
      partialQuery = '';
    }
  });

  queries.map((query, index) => {
    pool.getConnection((err, connection) => {
      try {
        connection.query(query, () => {
          connection.release();
          console.log(index);
        });
      } catch (error) {
        console.error(error);
      }
    });
  });
};

module.exports = executeQueryFile;
