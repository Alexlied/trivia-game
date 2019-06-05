import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            answers: {}
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
            // this.props.addScore();
            console.log(this.props.idx + ": correct answer");
        } else {
            console.log(this.props.idx + ": wrong answer");
        }
    }

    render() {
        const questionDetails = this.props.question;

        let answers = new Array();

        for (let i = 0; i < questionDetails.incorrect_answers.length; i++) {
            answers.push(questionDetails.incorrect_answers[i]);
        }

        answers.push(questionDetails.correct_answer);
        this.shuffle(answers);

        if (questionDetails.type === 'boolean') {
            return (
                <div className='question-container'>
                    Question #{this.props.idx}:
                    <div className='question'>{questionDetails.question}</div>
                    <input type="radio" value="TRUE" name="boolean" /> True
                    <input type="radio" value="FALSE" name="boolean" /> False
                </div>
            );
        } else {
            return (
                <div className='question-container'>
                    Question #{this.props.idx}:
                    <div className='question'>{questionDetails.question}</div>
                    <div className='answer' onChange={event => this.setAnswer(event)}>
                        <input type="radio" value={answers[0]} name="answer" /> {answers[0]}
                        <input type="radio" value={answers[1]} name="answer" /> {answers[1]}
                        <input type="radio" value={answers[2]} name="answer" /> {answers[2]}
                        <input type="radio" value={answers[3]} name="answer" /> {answers[3]}
                    </div>
                </div>
            );
        }
    }
}
Question.propTypes = {
    question: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired
}
