import React from 'react';
import PropTypes from 'prop-types';
import './quote-loader.scss';
import axios from 'axios';

class QuoteLoader extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            quote: {}
        }
        // Bind the fetch a random quote
        this.fetchARandomQuote = this.fetchARandomQuote.bind(this);
        this.tweetTheQuote = this.tweetTheQuote.bind(this);
    }

    componentDidMount() {
        // Get a random quote and set the state
        this.fetchARandomQuote();
    }

    fetchARandomQuote = () => {
        // Make a request to the API to fetch a new quote every time the page loads
        axios({
            method: 'get',
            url: 'https://type.fit/api/quotes',
            headers: {  }
        })
            .then((response) => {
                const quotes = response.data;
                const numOfQuotes = quotes.length;
                const randomQuote = quotes[
                    Math.floor(
                        Math.random() * (numOfQuotes - 1)
                    )
                ];
                // Update the current state and set the inspirational quote
                this.setState({
                    quote: randomQuote
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    tweetTheQuote = () => {
        const tweetText = encodeURIComponent(
            this.state.quote.text
            +' '
            +(this.state.quote.author ? this.state.quote.author : 'Unknown')
        );
        const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=quotes&related=freecodecamp`;
        window.open(tweetUrl, '_blank');
    }

    render() {
        return (
            <div id="quote-page">
                <div id="quote-box">
                    <div id="text" hidden={!this.state.quote.text}>
                        {this.state.quote.text}
                    </div>
                    <div id="author">
                        - {this.state.quote.author ? this.state.quote.author : 'Unknown'}
                    </div>
                    <div className="button-group">
                        <a 
                            className="tweet-quote"
                            onClick={this.tweetTheQuote}>
                            Tweet
                        </a>
                        <button 
                            id="new-quote"
                            onClick={this.fetchARandomQuote}>
                            New Quote
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

QuoteLoader.propTypes = {

};

export default QuoteLoader;