import React, { Component } from 'react';

import './Store.css';

import Inventory from './Inventory';

class Store extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: '',
      search: '',
      responseToPost: '0',
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

    //if it's a blank search then replace it with an empty array 
    let searchString = JSON.stringify({ post: ( this.state.search === "" ? "[]" : JSON.parse(this.state.search) ) });

    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: searchString,
    });
    const body = await response.text();

    this.setState({ responseToPost: body, inventory: JSON.parse(body).inventory });
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

  removeItems = async e => {
    e.preventDefault()
    const response = await fetch('/api/items/5566',{
      method: 'DELETE'
    });
    const body = await response.text();

    console.log("the response from Delete")
    console.log(body);

    if (response.status === 400){
      
    } else if (response.status !== 200) {
      throw Error(body.message);
    } else {
      this.setState({ inventory: JSON.parse(body).inventory });
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
                value={this.state.search}
                onChange={e => this.setState({ search: e.target.value })}
                class="form-control"
              />
              <button class="btn btn-primary" type="submit">search</button>
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

          <form onSubmit={this.removeItems}>
            <p>
              <button type="submit">Delete Item 5566</button>  
            </p> 
          </form>

          <div class="container" key={this.state.inventoryID}>
            <Inventory 
              key={this.state.responseToPost}
              // resp={this.state.responseToPost}
              inventory={this.state.inventory}
            />
         </div>
         </div>
      </div>
    );
  }
}

export default Store;
