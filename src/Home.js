import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Question from './Question';

export default class Home extends React.Component {

    render() {
        return (
            <div className="home">
                <div className="home-title">
                    Trivia Game
                </div>
                <p>This game will allow users to quiz themselves on a variety of subjects. 
                    The database is publically available so users are free to submit their own questions at <a href="https://opentdb.com/">https://opentdb.com/</a>.</p>
                <Link to={'/QuestionPage'}><div className="start-button">Start Quiz</div></Link>
            </div>
        );
    }
}
