import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';

class QuoteMachine extends Component {
  constructor (props) {
    super(props);
    this.state = {
      quotes: [],
      currentQuote: '',
      currentAuthor: ''
    }
  }

  // This method fetches a new quote
  fetchQuote = () => {
    // const CORS_PROXY = 'https://proxy.cors.sh/';
    const API_URL = 'https://quotes-api-self.vercel.app/quote';

    /* 
    fetch(`${CORS_PROXY}${API_URL}`, {
      headers: {
        'x-cors-api-key': 'temp_d4b6a9adec86c0945a6df23aad500b57'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Store all quotes in state
        this.setState({quotes: data});
        // Set the first quote to be default
        if (data.length > 0) {
          this.setQuote(0)
        }
      })
      .catch(error => console.error('Error fetching quote:', error)); 
    */

    fetch(`${API_URL}`)
      .then(response => response.json())
      .then(data => {
        // Store all quotes in state
        this.setState({
          quotes: data,
          currentQuote: data.quote,
          currentAuthor: data.author
        }, () => {
          // This callback runs after the state has been updated
          // Set the first quote to be default
          console.log(this.state.quotes)
          // if (data.length > 0) {
          //   this.setQuote(0)
          // }
          
        });
      })
      .catch(error => console.error('Error fetching quote:', error));
  }

  // FOR API THAT CONTAINS ARRAY OF QUOTES
  // Set current quote and author
  /* setQuote = (index) => {
    const selectedQuote = this.state.quotes[index];
    if (selectedQuote) { // Ensure selectedQuote is not undefined
      this.setState({
        currentQuote: selectedQuote.quote,
        currentAuthor: selectedQuote.author
      });
    } else {
      console.error('Selected quote is undefined');
    }
  }
  randomQuote = () => {
    const index = Math.floor(Math.random() * this.state.quotes.length);
    this.setQuote(index);
  } */
  
  // componentDidMount runs when this component is mounted to DOM
  componentDidMount() {
    this.fetchQuote();
  }


  render() {
    return (
      <div className="App">
        <div className="wrapper" id="quote-box">
          <img src={logo} alt="React" className="App-logo"/>
          <p id="text">{this.state.currentQuote}</p>
          <p id="author">- {this.state.currentAuthor}</p>
          <div className="button-container">
            <a href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="' + this.state.currentQuote + '" - ' + this.state.currentAuthor} target="_blank" id="tweet-quote" rel="noreferrer">Tweet</a>
            <button id="new-quote" onClick={this.fetchQuote}>New Quote</button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteMachine;
