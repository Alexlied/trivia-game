import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedInput: false,
            color: 'question-container',
            hasShuffled: false,
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
        console.log("Shuffled answers");
        return array;
    }

    setAnswer(event) {
        console.log(event.target.value);

        if (event.target.value === this.props.correct) {
            this.props.addScore(1);
            console.log("Selected index = " + event.target.value + ": correct answer");
            this.setState({
                color: 'question-container-correct'
            });
        } else {
            console.log("Selected index = " + event.target.value + ": wrong answer");
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
            <div className={containerClass} value='question'>
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
    question: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired
}
