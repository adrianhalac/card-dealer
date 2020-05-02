import React, { Component } from 'react'
import Card from './Card';
import './Deck.css';

class Deck extends Component {
  render(){
    return(
      <div className='Deck'>
        {this.props.cards.map(card => {
          return <Card key={card.id} value={card.value} suit={card.suit} imageLink={card.image} rotation={card.rotation} offset={card.offset}/>
        })}
      </div>
    );
  }
}

export default Deck;