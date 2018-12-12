import React, { Component } from 'react';

import './Inventory.css';

function Hologram(props){
  return(
    <div class={props.colsize}>
      <h3 >{props.id || "ID"}</h3>
      <h1>{props.name || "NAME"}</h1>
      <h2>{props.description || "description"}</h2>
    </div>
    );
}

class Inventory extends Component {

  renderGrid(props){
    return(
      props.inventory.map(function(item, i){
        console.log('test');
        return(
          <Hologram 
            key={i}
            id={item.id}
            name={item.name}
            description={item.description}
            colsize="col-sm-4"
          />);
      })
    );
  }

  render(){
    return(
      <div>
        <div class="row">
          {this.renderGrid(this.props)}
        </div>
      </div>
    );
  }
}

export default Inventory;