import React, { Component } from 'react';

import './Inventory.css';

function Hologram(props){
  return(
    <div className={props.colsize}>
      <h3 >{props.id || "ID"}</h3>
      <h1>{props.name || "NAME"}</h1>
      <p>{props.description || "description"}</p>
    </div>
    );
}

class Inventory extends Component {

  renderGrid(props){
    return(
      props.inventory.map(function(item, i){
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
        <div className="row">
          {this.renderGrid(this.props)}
        </div>
      </div>
    );
  }
}

export default Inventory;