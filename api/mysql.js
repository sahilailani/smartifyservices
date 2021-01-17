'use strict';

module.exports = function (app, mysqlCon) {
  app.post('/query', (req, res, next) => {
    mysqlCon.query(req.body.query, req.body.value, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'some error occured', err });
      } else {
        res.status(200).send(result);
      }
    });
  });

  app.post('/insert', (req, res, next) => {
    const table = req.body.table;
    const data = req.body.data;

    function bulkInsert(connection, table, objectArray, callback) {
      let keys = Object.keys(objectArray[0]);
      let values = objectArray.map( obj => keys.map( key => obj[key]));
      let sql = 'INSERT INTO ' + table + ' (' + keys.join(',') + ') VALUES ?';
      connection.query(sql, [values], function (error, results, fields) {
        if (error) callback(error);
        callback(null, results);
      });
    }
    bulkInsert(mysqlCon, table, data, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'some error occured', err });
      } else {
        res.status(200).send(result);
      }
    });
  });

  app.post('/update', (req, res, next) => {
    const table = req.body.table;
    const data = req.body.data;
    let where = req.body.where ? `WHERE ${req.body.where}` : '';

    mysqlCon.query(`UPDATE ${table} SET ? ${where}`, [data], function (err, result, fields) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'some error occured', err });
      } else {
        res.status(200).send(result);
      }
    });
  });



  app.post('/delete', (req, res, next) => {
    const table = req.body.table;
    const where = req.body.where;
    mysqlCon.query(`DELETE FROM ${table} WHERE ${where}`, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'some error occured', err });
      } else {
        res.status(200).send(result);
      }
    });
  });
}