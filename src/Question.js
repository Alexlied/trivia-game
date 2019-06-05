import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            answers: {},
            selectedInput: false,
            color: 'question-container'
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
        console.log(event.target.value);

        if (event.target.value === this.props.question.correct_answer) {
            this.props.addScore(1);
            console.log(this.props.idx + ": correct answer");
            this.setState({
                color: 'question-container-correct'
            });
        } else {
            console.log(this.props.idx + ": wrong answer");
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

        let answers = new Array();

        for (let i = 0; i < questionDetails.incorrect_answers.length; i++) {
            answers.push(questionDetails.incorrect_answers[i]);
        }

        answers.push(questionDetails.correct_answer);
        
        if(this.state.selectedInput === false) {
            answers = this.shuffle(answers);
            console.log("shuffled");
        }

        let containerClass = this.state.color;

        return (
            <div className={containerClass} value='question'>
                Question #{this.props.idx}:
                    <div className='question'>{questionDetails.question}</div>
                <div className='answer' onChange={event => this.setAnswer(event)}>
                    <input type="radio" value={answers[0]} name="answer" disabled={this.state.selectedInput} /> {answers[0]}
                    <input type="radio" value={answers[1]} name="answer" disabled={this.state.selectedInput} /> {answers[1]}
                    <input type="radio" value={answers[2]} name="answer" disabled={this.state.selectedInput} /> {answers[2]}
                    <input type="radio" value={answers[3]} name="answer" disabled={this.state.selectedInput} /> {answers[3]}
                </div>
            </div>
        );
    }
}
Question.propTypes = {
    question: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired
}
