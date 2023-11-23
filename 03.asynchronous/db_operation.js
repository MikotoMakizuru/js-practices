function promiseRun(db, sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
}

function promiseAll(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

export { promiseRun, promiseAll };
