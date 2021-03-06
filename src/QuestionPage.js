import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Question from './Question';
import home from './images/home.png';

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
        let triviaUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';

        if (Number(this.props.match.params.id) >= 9 && Number(this.props.match.params.id) <= 32) {
            triviaUrl = triviaUrl + "&category=" + this.props.match.params.id;
        }

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
        if (score === 10) {
            alert("Congrats! You got a perfect score. Press the home button to try again.");
        } else {
            alert(`You scored out of ${score} out of 10 questions. Press the home button to try again.`, score);
        }
        event.preventDefault();
    }

    handleAddScore(val) {
        this.setState({
            score: this.state.score + val
        });
    }

    decodeString(encodedString) {
        let parser = new DOMParser;
        let dom = parser.parseFromString(
            '<!doctype html><body>' + encodedString,
            'text/html');
        return dom.body.textContent;
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
                let question = this.decodeString(trivia.question);
                let answers = [];

                for (let i = 0; i < trivia.incorrect_answers.length; i++) {
                    answers.push(this.decodeString(trivia.incorrect_answers[i]));
                }
                answers.push(this.decodeString(trivia.correct_answer));

                return (
                    <div key={idx + 1}>
                        <Question key={idx + 1} idx={idx + 1} question={question} answers={answers} correct={this.decodeString(trivia.correct_answer)} addScore={this.handleAddScore} />
                    </div>
                )
            });


        return (
            <div >
                <div className="home-link"><Link to={"/"}><img src={home} alt="home" /></Link></div>
                <form className="question-page" onSubmit={this.handleSubmit}>
                    <div className="question-list">{triviaEntry}</div>
                    <input className="submit-button" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
