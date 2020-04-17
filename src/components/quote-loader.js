import React from 'react';
import PropTypes from 'prop-types';
import './quote-loader.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft, faRedoAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

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
            +(this.state.quote.author ? '- ' + this.state.quote.author : '- Unknown')
        );
        const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=quotes&related=freecodecamp`;
        return tweetUrl;
    }

    render() {
        return (
            <div id="quote-page">
                <div id="quote-box">
                    <div id="text" hidden={!this.state.quote.text}>
                        <span className="double-quote"><FontAwesomeIcon icon={faQuoteLeft} /></span><span>{this.state.quote.text}</span>
                    </div>
                    <div id="author">
                        - {this.state.quote.author ? this.state.quote.author : 'Unknown'}
                    </div>
                    <div className="button-group">
                        <a 
                            id="tweet-quote"
                            className="tweet-quote"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={this.tweetTheQuote()}>
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <div className="app-name">
                            Some Awesome Quotes.
                        </div>
                        <button 
                            id="new-quote"
                            onClick={this.fetchARandomQuote}>
                            <FontAwesomeIcon icon={faRedoAlt} />
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