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

    render() {
        const questionDetails = this.props.question;

        if (questionDetails.type === 'boolean') {
            return (
                <div className='question'>
                    Question #{this.props.idx}:
                    <div>{questionDetails.question}</div>
                    <input type="radio" value="TRUE" name="boolean" /> True
                    <input type="radio" value="FALSE" name="boolean" /> False
                </div>
            );
        } else {
            return (
                <div className='question'>
                    Question #{this.props.idx}:
                    <div>{questionDetails.question}</div>
                    Multiple Choice Answer
                    <input type="radio" value="CORRECT" name="answer" /> {questionDetails.correct_answer}
                </div>
            );
        }
    }
}
Question.propTypes = {
    question: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired
}
