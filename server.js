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
    "id":'0001',
    "name":"Freddie Mercury",
    "description":"Another one bites the dust.",
    "timeAdded":"CURRENT_TIMESTAMP"
  },
  {
    "id":'0002',
    "name":"Michael Jackson",
    "description":"Is Annie okay?",
    "timeAdded":"CURRENT_TIMESTAMP"
  },
  {
    "id":'0003',
    "name":"Michelle Obama",
    "description":"Lady President",
    "timeAdded":"CURRENT_TIMESTAMP"
  },
  {
    "id":'0004',
    "name":"Mozart",
    "description":"Total badass musician",
    "timeAdded":"CURRENT_TIMESTAMP"
  },
  {
    "id":'0005',
    "name":"Tupac",
    "description":"Spokesperson for this app",
    "timeAdded":"CURRENT_TIMESTAMP"
  },
  {
    "id":'0006',
    "name":"Shakespeare",
    "description":"2b || !2b ",
    "timeAdded":"CURRENT_TIMESTAMP"
  }
]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/search', (req, res) => {
  console.log(
    `You are searching for: \n ${req.body.post}`,
  );

  let searchString = req.body.post;
  let results = [];

  for(let i=0; i<inventory.length; i++) {
    if(inventory[i]["id"].indexOf(searchString)!=-1) {
      results.push(inventory[i]);
    }
  }

  console.log( results )
  res.send({inventory: results});
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
  console.log('responded to post items')
  inventory.push(req.body);
  res.send({inventory});
})

app.listen(port, () => console.log(`Listening on port ${port}`));

