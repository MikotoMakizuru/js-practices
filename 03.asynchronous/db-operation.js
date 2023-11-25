function promiseRun(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
}

function promiseAll(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.all(sql, param, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

export { promiseRun, promiseAll };
