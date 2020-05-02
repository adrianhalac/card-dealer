import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render(){
    let offset = this.props.offset;
    let transformVal = `rotate(${this.props.rotation}deg)`;
    transformVal += ` translate(${offset.x}px, ${offset.y}px)`;

    let rStyle = {
      transform: transformVal,
    };

    return(
      <div className='Card'>
        <img 
          src={this.props.imageLink} 
          alt={`${this.props.value} of ${this.props.suit}`}
          style={rStyle}
        />
      </div>
    );
  }
}

export default Card;