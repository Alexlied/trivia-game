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
                    Multiple Choice Answer
                    {/* <input type="radio" value="CORRECT" name="answer" /> {questionDetails.correct_answer} */}

                    <input type="radio" value={answers[0]} name="answer" /> {answers[0]}
                    <input type="radio" value={answers[1]} name="answer" /> {answers[1]}
                    <input type="radio" value={answers[2]} name="answer" /> {answers[2]}
                    <input type="radio" value={answers[3]} name="answer" /> {answers[3]}
                </div>
            );
        }
    }
}
Question.propTypes = {
    question: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired
}
