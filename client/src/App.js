import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

function Hologram(props){
  return(
      <td>
        <h2>{props.name || "NAME"}</h2>
        <p>{props.description || "description"}</p>
      </td>
    );
}

class Inventory extends React.Component {

  renderRow(rowItems){
    let holos = [];
    let numItems = rowItems.length;

    for (let i=0; i < numItems; i++){
      holos.push(<Hologram key={i} name={rowItems[i].name} description={rowItems[i].description}/>);
    }
    return(holos);
  }

  renderGrid(props){
    let numItems = props.inventory.length;
    let numRows = Math.floor(numItems/4);
    let lastRow = numItems%4;
    let rows = [];

    for(let i=0; i<numRows; i++){
      rows.push(
        <tr>
          {this.renderRow(props.inventory.slice((i*4+i),(i*4+i+4)))}
        </tr>);
    };
    
    rows.push(<tr>{this.renderRow(props.inventory.slice(numItems - lastRow))}</tr>);
    
    return(
      <div className="InvRow"> 
        <tr>
          {rows}
        </tr>
      </div>
    );
  }

  render(){
    return(
      <div>
        <p>{this.props.resp}</p>
        <table style={{width:'100%'}}>
          {this.renderGrid(this.props)}
        </table>
      </div>
    );
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      sampledata : [
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
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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

  getItems = async e => {
    e.preventDefault();
    const response = await fetch('/api/items');
    const body = await response.text();

    if (response.status !== 200) throw Error(body.message);

    this.setState({ responseToPost: body });
  }

  render() {
    return (
      <div>
        <div className="App-header">
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
        <div className="App">
          <p>{this.state.response}</p>
          <form onSubmit={this.getItems}>
            <p>
              <strong>Request items:</strong>
              <button type="submit">Get Items</button>
            </p>
          </form>
          <div className="game-board">
          <Inventory 
            resp={this.state.responseToPost}
            inventory={this.state.sampledata}
          />
         </div>
         </div>
      </div>
    );
  }
}

export default App;
