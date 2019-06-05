import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Question from './Question';

export default class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true,
            hasError: false,
            score: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddScore = this.handleAddScore.bind(this);
    }

    componentDidMount() {
        //const triviaUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
        const triviaUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
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

    handleSubmit(event) {
        let score = this.state.score;
        alert(`You scored out of ${score} out of 10 questions`, score);
        event.preventDefault();
    }

    handleAddScore(val) {
        this.setState({
            score: this.state.score + val
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
                let question = trivia.question;
                let answers = new Array();

                for (let i = 0; i < trivia.incorrect_answers.length; i++) {
                    answers.push(trivia.incorrect_answers[i]);
                }
                answers.push(trivia.correct_answer);

                return (
                    <div key={idx + 1}>
                        <Question key={idx + 1} idx={idx + 1} question={question} answers={answers} correct={trivia.correct_answer} addScore={this.handleAddScore} />
                    </div>
                )
            });
            

        return (
            <div className="question-page">
                <div className="home-link"><Link to={"/"}>Home</Link></div>
                <form onSubmit={this.handleSubmit}>
                    <div className="question-list">{triviaEntry}</div>
                    <input className="submit-button" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
