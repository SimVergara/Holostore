import React, { Component } from 'react';

import './Store.css';

import Inventory from './Inventory';

class Store extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: '',
      search: '',
      searched: false,
      responseToPost: '0',
      inventory : [{
        "name": "Loading inventory"
      }],
      newName: '',
      newDesc: '',
      deleteID: '',
    };
  }

  componentDidMount() {
    this.loadPage()
      .then(res => this.setState({ inventory: JSON.parse(res).inventory }))
      .catch(err => console.log(err));
  }

  loadPage = async () => {
    const response = await fetch('/api/items');
    const body = await response.text();

    if (response.status !== 200) throw Error(body.message);

    this.setState({ inventory: JSON.parse(body).inventory });
    return body;
  };

  clearSearch = async e => {
    e.preventDefault();
    const response = await fetch('/api/items');
    const body = await response.text();

    if (response.status !== 200) throw Error(body.message);

    this.setState({
      inventory: JSON.parse(body).inventory,
      search: '',
      searched: false,
    });
    return body;
  };

  handleSearch = async e => {
    e.preventDefault();

    //if it's a blank search then replace it with an empty array 
    let searchString = JSON.stringify({ post: ( this.state.search === "" ? "[]" : this.state.search ) });

    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: searchString,
    });
    const body = await response.text();

    this.setState({
      inventory: JSON.parse(body).inventory,
      searched: true,
    });
  };

  addItem = async e => {
    e.preventDefault();
    const response = await fetch('/api/items',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ 
        "name": this.state.newName, 
        "description": this.state.newDesc,
      })
    });
    const body = await response.text();

    if (response.status !==200){
     throw Error(response.body);
    } else {
      this.setState({ 
        inventory: this.state.inventory.concat(JSON.parse(body).inventory),
        newName: '',
        newDesc: '',
      })
    }
  };

  removeItems = async e => {
    e.preventDefault()
    const response = await fetch(`/api/items/${this.state.deleteID}`,{
      method: 'DELETE'
    });
    const body = await response.text();

    console.log("the response from Delete")
    console.log(body);

    if (response.status === 400){
      
    } else if (response.status !== 200) {
      throw Error(body.message);
    } else {
      this.setState({ 
        inventory: JSON.parse(body).inventory,
        deleteID: '',
      });
    }
  };
  

  render() {
    return (
      <div>
        <div className="Store-header">
          <strong>Holostore</strong>
          <form onSubmit={this.handleSearch}>
              <input
                type="text"
                value={this.state.search}
                onChange={e => this.setState({ search: e.target.value })}
              />
              <button className="btn btn-primary" type="submit">search</button>
          </form>
        </div>
        <div className="Store">
          <div className="Store-sidebar">

            <form onSubmit={this.addItem}>
                <h1>Add Hologram</h1>
                Name <br/>
                <input
                  type="text"
                  value={this.state.newName}
                  onChange={e => this.setState({ newName: e.target.value })}
                />
                <br/>
                Description <br/>
                <textarea
                  type="text"
                  value={this.state.newDesc}
                  onChange={e => this.setState({ newDesc: e.target.value })}
                />
                <br/>
                <button type="submit" disabled={!(this.state.newName && this.state.newDesc)}> + </button>  
            </form>
            <br/>
            <form onSubmit={this.removeItems}>
                <h1>Delete Hologram</h1>
                ID <br/>
                <input
                  type="text"
                  value={this.state.deleteID}
                  onChange={e => this.setState({ deleteID: e.target.value })}
                />
                <br/>
                <button type="submit" disabled={!(this.state.deleteID)}> X </button>  
            </form>
          </div>

          <div class="container">

            <form onSubmit={this.clearSearch}>
              <p>
                { (this.state.searched) && <button type="submit">Clear Search</button> }
              </p>
            </form>
            <Inventory 
              inventory={this.state.inventory}
            />
         </div>
        </div>
      </div>
    );
  }
}

export default Store;
