import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true,
            hasError: false
        }
    }

    componentDidMount() {
        const triviaUrl = 'https://opentdb.com/api.php?amount=10';
        fetch(triviaUrl)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    data: data.results,
                    isLoading: false
                });
            })
            .catch(error => {
                this.setState({
                    hasError: true,
                    isLoading: false
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        if (this.state.hasError) {
            return <div>ERROR, please reload and try again</div>;
        }

        const triviaEntry = this.state.data
            .map((trivia, idx) => {
                return (
                    <div>
                        {/* {trivia} */}
                        Question #{idx+1}: 
                        {trivia.question}
                    </div>
                )
            });

        return (
            <div className="home">
                Home
                <div>{triviaEntry}</div>
            </div>
        );
    }
}
