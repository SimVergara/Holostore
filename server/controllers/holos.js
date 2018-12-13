const Holograms = require('../models').Holograms;

var myInventory = [];

module.exports = {
  list (req, res){
    console.log('response sent to client');

    return Holograms
      .findAll()

      .then((inventory) => {
        res.status(200).send({inventory: inventory})
      })
      .catch((error) => res.status(400).send(error));
  },

  new(req, res){
    //create the requested resource in the database. return 201 when successful
    return Holograms
      .create(req.body)
      .then((created) => {
        res.status(201).send({inventory: created});
        myInventory.push(created);
      })
      .catch((error) => res.status(400).send(error));
  },

  search(req, res){
    console.log(
      `You are searching for: \n ${req.body.post}`,
    );

    console.log(myInventory)

    let searchString = req.body.post;
    
    return Holograms
      .findAll({
        where: {
          id: {
            $like: '%' + req.body.post + '%'
          }
        }
      })
      .then((inventory) => {
        res.status(200).send({inventory: inventory});
      })
      .catch((error) => res.status(400).send(error));
  },

  remove(req, res){
    var id = req.params.id;
    console.log(`you are trying to delete \n\t ${id}`);
    
    return Holograms
      .destroy({
        where: {
          id: id
        }
      })
      .then((numDeleted) =>{
        console.log(`${numDeleted} item(s) got deleted`)
        if (numDeleted == 0){
          res.status(400).send('No items by that ID');
        } else {
          res.status(200).send({deleted: numDeleted});
        }
      })
    // let results = {};

    // results = searchInventory(id, true);

    // if (results.findings.length == 0){
    //   //ID not found
    //   res.status(400);
    //   res.send('No items by that ID');
    // } else {
    //   //Remove ID from inventory
    //   inventory.splice(results.i, 1);
    //   console.log(inventory);
    //   res.send({inventory});
    // }
  }
};


function searchInventory(searchString, inventory, tightSearch) {
  let results = [];
  let i;

  for(i=0; i<inventory.length; i++) {
    if (tightSearch) {
      if(inventory[i]["id"] === searchString) {
        results.push(inventory[i]);
        break;
      }
    } else {
      if(inventory[i]["id"].indexOf(searchString)!=-1) {
        results.push(inventory[i]);
      }
    }
  }

  return {
    findings: results, 
    i: i
  };
}


// var inventory = [
//   {
//     "id":'0001',
//     "name":"Freddie Mercury",
//     "description":"Another one bites the dust.",
//     "timeAdded":"CURRENT_TIMESTAMP"
//   },
//   {
//     "id":'0002',
//     "name":"Michael Jackson",
//     "description":"Is Annie okay?",
//     "timeAdded":"CURRENT_TIMESTAMP"
//   },
//   {
//     "id":'0003',
//     "name":"Michelle Obama",
//     "description":"Lady President",
//     "timeAdded":"CURRENT_TIMESTAMP"
//   },
//   {
//     "id":'0004',
//     "name":"Mozart",
//     "description":"Total badass musician",
//     "timeAdded":"CURRENT_TIMESTAMP"
//   },
//   {
//     "id":'0005',
//     "name":"Tupac",
//     "description":"Spokesperson for this app",
//     "timeAdded":"CURRENT_TIMESTAMP"
//   },
//   {
//     "id":'0006',
//     "name":"Shakespeare",
//     "description":"2b || !2b ",
//     "timeAdded":"CURRENT_TIMESTAMP"
//   }
// ]