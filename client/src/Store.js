import React, { Component } from 'react';

import './Store.css';

import Inventory from './Inventory';

class Store extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      inventory : [{
        "name": "Loading inventory"
      }],
      inventoryID: 0,
    };
  }

  componentDidMount() {
    this.getItems()
      .then(res => this.setState({ inventory: JSON.parse(res).inventory }))
      .catch(err => console.log(err));
  }

  getItems = async () => {
    const response = await fetch('/api/items');
    const body = await response.text();

    if (response.status !== 200) throw Error(body.message);

    // this.setState({ inventory: body });
    return body;
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  addItem = async e => {
    e.preventDefault();
    const response = await fetch('/api/items',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: '{ "id": "5566", "name": "Lucius", "description":"Not a great guy tbh", "timeAdded":"CURRENT_TIMESTAMP+1"}'
    });
    const body = await response.text();

    if (response.status !==200){
     throw Error(response.body);
    } else {
      this.setState({ inventory: JSON.parse(body).inventory })
    } 
  }
  

  render() {
    return (
      <div>
        <div className="Store-header">
          <form onSubmit={this.handleSubmit}>
            <p>
              <strong>Holostore</strong>
              <input
                type="text"
                value={this.state.post}
                onChange={e => this.setState({ post: e.target.value })}
              />
              <button type="submit">search</button>
            </p>
          </form>
        </div>
        <div className="Store">
          <form onSubmit={this.getItems}>
            <p>
              <button type="submit">Get Items</button>
            </p>
          </form>

          <form onSubmit={this.addItem}>
            <p>
              <button type="submit">Add Item</button>  
            </p> 
          </form>

          <div className="Inventory-Grid" key={this.state.inventoryID}>
          <Inventory 
            resp={this.state.responseToPost}
            inventory={this.state.inventory}
          />
         </div>
         </div>
      </div>
    );
  }
}

export default Store;
