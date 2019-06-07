import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedInput: false,
            color: 'question-container',
            shuffledAnswers: this.shuffle(this.props.answers)
        }
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    setAnswer(event) {
        if (event.target.value === this.props.correct) {
            this.props.addScore(1);
            this.setState({
                color: 'question-container-correct'
            });
        } else {
            this.setState({
                color: 'question-container-wrong'
            });
        }
        this.setState({
            selectedInput: true
        });
    }

    render() {
        const questionDetails = this.props.question;
        let containerClass = this.state.color;

        return (
            <div className={'question-container ' + containerClass} value='question'>
                <div className="question-number">Question #{this.props.idx}:</div>
                <div className='question'>{questionDetails}</div>
                <div className='answer-list' onChange={event => this.setAnswer(event)}>
                    <input type="radio" value={this.state.shuffledAnswers[0]} name="answer" disabled={this.state.selectedInput} /> {this.state.shuffledAnswers[0]}
                    <input type="radio" value={this.state.shuffledAnswers[1]} name="answer" disabled={this.state.selectedInput} /> {this.state.shuffledAnswers[1]}
                    <input type="radio" value={this.state.shuffledAnswers[2]} name="answer" disabled={this.state.selectedInput} /> {this.state.shuffledAnswers[2]}
                    <input type="radio" value={this.state.shuffledAnswers[3]} name="answer" disabled={this.state.selectedInput} /> {this.state.shuffledAnswers[3]}
                </div>
            </div>
        );
    }
}
Question.propTypes = {
    question: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    correct: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired
}
