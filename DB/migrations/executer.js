const fs = require('fs');

const execute_query_file = (pool, path, filename) => {
    const file_address = path + filename;
    let fileLines = fs.readFileSync(file_address).toString().split("\n");
    let cleared_lines = [];
    let queries = [];

    // Eliminates all comments in the file
    fileLines.forEach((line, index) => {
        line = line.replace(/[\n\r]/g, '');   // replaces carriage returns with empty strings
        if(!line.includes("*") && !line.includes("-") && line.length > 0) {
            cleared_lines.push(line);
        }
    });

    let partial_query = "";

    // Extracts the queries and place them in an array
    cleared_lines.forEach((line, index) => {
        partial_query += line;
        if(line.charAt(line.length-1) === ";") {
            queries.push(partial_query);
            partial_query = "";
        }
    });

    queries.map(query => {
            pool.getConnection((err, connection) => { 
              try {
                connection.query(query, (error, results) => {
                  connection.release();
                  //console.log(err)
                });
              } catch (err) {
                if (err) throw err;
              }
            });  
      })
}

module.exports = execute_query_file;
