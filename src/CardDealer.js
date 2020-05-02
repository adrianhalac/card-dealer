import React, { Component } from 'react'
import Deck from './Deck';
import './CardDealer.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/';

class CardDealer extends Component {
  constructor(props){
    super(props);
    this.state = {
      deck: null,
      dealt: []
    };

    this.dealCard = this.dealCard.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage(){
    window.location.reload(false);
  }

  async dealCard(){
    let newCardUrl = `https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/`;
    let newCardRes = await axios.get(newCardUrl);
    let rotation = ((Math.random() * 51) - 25).toFixed(2);
    let x = ((Math.random() * 31) - 15).toFixed(2);
    let y = ((Math.random() * 31) - 15).toFixed(2);
    let offset = {x: x, y: y};
    let newCard = {
      ...newCardRes.data.cards[0], 
      id: uuidv4(), 
      rotation: rotation,
      offset: offset
    };

    let newRemaining = newCardRes.data.remaining;

    this.setState(state => ({
      dealt: [...state.dealt, newCard],
      deck: {...state.deck, remaining: newRemaining}
    }));
  }

  async componentDidMount(){
    let response = await axios.get(API_URL);
    this.setState({ deck: response.data });
  }

  render(){
    let buttonHTML = '';
    if(!this.state.deck){
      buttonHTML = <h1>Fetching cards....</h1>
    } else if (this.state.deck.remaining > 0){
      buttonHTML = <button className='CardDealer-button-fetch' onClick={this.dealCard}>DEAL ME A CARD!</button>;
    } else {
      buttonHTML = <h1 className='CardDealer-button-reload'>
                    DECK IS EMPTY! <button onClick={this.reloadPage}>GRAB A NEW DECK?</button>
                  </h1>;
    }

    return(
      <div className='CardDealer'>
        <div className='CardDealer-header'>
          <h1>CARD DEALER</h1>
        </div>
        <div className='CardDealer-button'>
          {buttonHTML}
        </div>
        <div className='CardDealer-deck'>
          <Deck cards={this.state.dealt}/>
        </div>
        <div className='CardDealer-remaining'>
          {this.state.deck && 
          <h1>You have
            <span className='CardDealer-remaining-num'> {this.state.deck.remaining} </span> 
            cards left in the deck</h1>}
        </div>
      </div>
    );
  }
}

export default CardDealer;