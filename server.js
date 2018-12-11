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

var inventory = [
  {
    "id":'1234',
    "name":"Freddie Mercury",
    "description":"Another one bites the dust.",
    "timeAdded":"CURRENT_TIMESTAMP"
  },
  {
    "id":'5678',
    "name":"Michael Jackson",
    "description":"Is Annie okay?",
    "timeAdded":"CURRENT_TIMESTAMP"
  },
  {
    "id":'9012',
    "name":"Michelle Obama",
    "description":"Lady President",
    "timeAdded":"CURRENT_TIMESTAMP"
  },
  {
    "id":'3456',
    "name":"Mozart",
    "description":"Total badass musician",
    "timeAdded":"CURRENT_TIMESTAMP"
  },
  {
    "id":'7890',
    "name":"Tupac",
    "description":"Spokesperson for this app",
    "timeAdded":"CURRENT_TIMESTAMP"
  },
  {
    "id":'0123',
    "name":"Shakespeare",
    "description":"2b || !2b ",
    "timeAdded":"CURRENT_TIMESTAMP"
  }
]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `You are searching for: \n ${req.body.post}`,
  );
});

app.get('/api/items', (req, res) => {
  // db.connect()
  // db.query('SELECT * from item', function (err, rows, fields) {
  //   if (err) throw err
  //     res.send(rows); 
  //   console.log('The solution is: ', rows)
  // });
  // db.end()
  console.log('response sent to client');
  res.send({ inventory })
});

app.post('/api/items', (req, res) => {
  inventory.push(req.body);
  res.send({inventory});
})

app.listen(port, () => console.log(`Listening on port ${port}`));

