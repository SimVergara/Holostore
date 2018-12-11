import React, { Component } from 'react';

import './Inventory.css';

function Hologram(props){
  return(
      <td style={{width:'25%'}}  className="InvRow">
        <p>{props.id || "ID"}</p>
        <h2>{props.name || "NAME"}</h2>
        <p>{props.description || "description"}</p>
      </td>
    );
}

class Inventory extends Component {

  renderRow(rowItems){
    let holos = [];
    let numItems = rowItems.length;

    for (let i=0; i < numItems; i++){
      holos.push(
        <Hologram 
          key={i} 
          name={rowItems[i].name} 
          description={rowItems[i].description}
          id={rowItems[i].id}
        />);
    }
    return(holos);
  }

  renderGrid(props){
    let numItems = props.inventory.length;
    let numRows = Math.floor(numItems/4);
    let lastRow = numItems%4;
    let rows = [];

    for(var i=0; i<numRows; i++){
      rows.push(
        <tr key={i}>
          {this.renderRow(props.inventory.slice((i*4),(i*4+4)))}
        </tr>);
    };
    
    rows.push(<tr key={i+1}>{this.renderRow(props.inventory.slice(numItems - lastRow))}</tr>);
    
    return(
      <tbody > 
          {rows}
      </tbody>
    );
  }

  render(){
    return(
      <div>
        <p>{this.props.resp}</p>
        <table>
          {this.renderGrid(this.props)}
        </table>
      </div>
    );
  }
}

export default Inventory;