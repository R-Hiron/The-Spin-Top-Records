//const dal = require("./SpinTop.db");
const dal = require("./p.db");

let getFullText = function (text) {
  if (DEBUG) console.log("postgres.dal.getFullText()");
  return new Promise(function (resolve, reject) {
    let sql = `
    SELECT * FROM public.records, public.records_fulltext
    WHERE 'title' iLIKE $1
       OR 'artist' ILIKE $1
       OR 'genre' ILIKE $1
       OR 'label' ILIKE $1
       OR 'description' ILIKE $1`;

    if (DEBUG) console.log(sql);
    dal.query(sql, [text], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(new Error(err.message || "Database query error"));
      } else {
        if (DEBUG) console.log(`Row count: ${result.rowCount}`);
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getFullText,
};
