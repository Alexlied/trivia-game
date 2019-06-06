import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ReactDropdown from 'react-dropdown';
import 'react-dropdown/style.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: ''
        }
        this._onSelect = this._onSelect.bind(this)
    }

    _onSelect(option) {
        console.log('You selected ', option.label)
        this.setState({ selected: option })
    }

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    render() {
        const map = {
            "0": "All Categories",
            "9": "General Knowledge",
            "10": "Entertainment: Books",
            "11": "Entertainment: Film",
            "12": "Entertainment: Music",
            "13": "Entertainment: Musicals & Theatres",
            "14": "Entertainment: Television",
            "15": "Entertainment: Video Games",
            "16": "Entertainment: Board Games",
            "17": "Science & Nature",
            "18": "Science: Computers",
            "19": "Science: Mathematics",
            "20": "Mythology",
            "21": "Sports",
            "22": "Geography",
            "23": "History",
            "24": "Politics",
            "25": "Art",
            "26": "Celebrities",
            "27": "Animals",
            "28": "Vehicles",
            "29": "Entertainment: Comics",
            "30": "Science: Gadgets",
            "31": "Entertainment: Japanese Anime & Manga",
            "32": "Entertainment: Cartoon & Animations"
        }

        let options = Object.values(map);
        const defaultOption = options[0];
        let placeHolderValue = "0";

        if (this.state.selected.label != null) {
            placeHolderValue = this.getKeyByValue(map, this.state.selected.label);
        }

        return (
            <div className="home">
                <div className="home-title">
                    Trivia Game
                </div>
                <p>This game will allow users to quiz themselves on a variety of subjects.
                    The database is publically available so users are free to submit their own questions at <a href="https://opentdb.com/">https://opentdb.com/</a>.</p>
                <p>Select a category of trivia questions and start the quiz.</p>
                <ReactDropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                <Link to={`/QuestionPage/${placeHolderValue}`}><div className="start-button">Start Quiz</div></Link>
            </div>
        );
    }
}
