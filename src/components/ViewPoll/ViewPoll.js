import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useLocation, useParams, useHistory, Redirect } from "react-router";
import { useEffect, useState } from "react";

import './ViewPoll.css'

import AvatarURL from "../Home/AvatarURL";
import Error404 from '../Errors/Error404/Error404'
import Username from "../Home/Username";
import { handleAddAnswer } from "../../actions/questions";
import { getAuthedUser } from "../../actions/authedUser";
import { Link } from "react-router-dom";

const ViewPoll = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { question_id } = useParams()
    const { params } = useLocation()
    const questions = useSelector(state => state.questions)
    const users = useSelector(state => state.users)
    const authUser = useSelector(state => state.authedUser)
    const [answer, setAnswer] = useState("");
    const [x, setX] = useState()

    console.log("questions[question_id] : ", questions[question_id]);

    if (questions[question_id] === undefined) {
       return <Error404 />
    }

    const autherUserAnsweres = users[authUser].answers
    const answered = autherUserAnsweres.hasOwnProperty(question_id) ? true : false;

    const totalVotes = questions[question_id].optionOne.votes.length + questions[question_id].optionTwo.votes.length
    const optionOnePercent = Math.round((questions[question_id].optionOne.votes.length / totalVotes) * 100)
    const optionTwoPercent = Math.round((questions[question_id].optionTwo.votes.length / totalVotes) * 100)


   

    const submitAnswer = (e) => {
        e.preventDefault()
        if (answer !== "") {
            console.log("fjkadjghdfhgkjfsh");
            dispatch(handleAddAnswer(question_id, answer, authUser))
            setX(true)
        }
    }

    const selectAnswerHandler = (e) => {
        if (e.target.value !== "") {
            setAnswer(e.target.value)
        }
    }

    return (
        <div className="d-flex justify-content-center viwe-poll">
            <div className="card w-50">
                <div className="name p-2">
                    {questions[question_id] && <p><Username id={questions[question_id].author} /></p>}
                </div>
                <div className="d-flex flex-row p-3">
                    <div className="d-flex align-items-center">
                        {questions[question_id] && <AvatarURL id={questions[question_id].author} />}
                    </div>
                    {!x && <div className="d-flex flex-column text-center mx-5">
                        <div>
                            <h3>Would You rather ...</h3>
                        </div>
                        <div>
                            {questions[question_id] &&
                                <form>
                                    <input onChange={(e) => { selectAnswerHandler(e) }} type="radio" name="options" id="optionOne" value="optionOne" />
                                    <label>{questions[question_id].optionOne.text}</label><br />

                                    <input onChange={(e) => { selectAnswerHandler(e) }} className="mt-3" type="radio" name="options" id="optionTwo" value="optionTwo" />
                                    <label>{questions[question_id].optionTwo.text}</label><br />
                                    <button onClick={(e) => { submitAnswer(e) }} type="submit" className="btn btn-outline-success w-100 mt-4"> Submit</button>
                                </form>}
                        </div>
                    </div>}
                    {x && <div className="d-flex flex-column text-center">
                        <div>
                            <h3>Would You rather ...</h3>
                            <h4> Results: </h4>
                        </div>
                        {questions[question_id] && <div className="row mx-5">
                            <div className={questions[question_id].optionOne.votes.includes(users[authUser].id) ? "col-12 card selected p-3" : "card p-3"}>
                                <div>
                                    <p> {questions[question_id].optionOne.text} </p>
                                    <p> {questions[question_id].optionOne.votes.length} </p>
                                    <p> {optionOnePercent} % </p>
                                </div>
                            </div>
                            <div className={questions[question_id].optionTwo.votes.includes(users[authUser].id) ? "card mt-3 selected p-3" : "card mt-3 p-3"}>
                                <div>
                                    <p>{questions[question_id].optionTwo.text}</p>
                                    <p> {questions[question_id].optionTwo.votes.length} </p>
                                    <p> {optionTwoPercent} % </p>
                                </div>
                            </div>
                        </div>}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ViewPoll