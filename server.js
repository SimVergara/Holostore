const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;
const db = mysql.createConnection({
	host: 'localhost',
	user: 'holostore',
	password: 'w0rdPA$$',
	database: 'holoschema'
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: \n ${req.body.post}`,
  );
});

app.get('/api/items', (req, res) => {
  db.connect()
  db.query('SELECT * from item', function (err, rows, fields) {
    if (err) throw err
      res.send(rows); 
    console.log('The solution is: ', rows)
  });
  db.end()
});

app.listen(port, () => console.log(`Listening on port ${port}`));


