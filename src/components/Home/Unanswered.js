import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import AvatarURL from "./AvatarURL"
import Username from "./Username"

const Unanswered = ({ user }) => {

    let questions = useSelector(state => state.questions)
    const users = useSelector(state => state.users)

    questions = Object.values(questions)
    questions.sort(function(a,b){
        return b.timestamp - a.timestamp;
      });

    return (
        <div className="w-100">
            {questions.map(question => {
                return (
                    (!question.optionOne.votes.includes(users[user].id) && !question.optionTwo.votes.includes(users[user].id)) &&
                    <div key={question.id} className="card p-3 m-2">
                        <div className="p-2">
                            <Username id={question.author} />
                        </div>
                        <div className="row">
                            <div className="col-6 d-flex justify-content-center border-end">
                                <AvatarURL id={question.author} />
                            </div>
                            <div className="col-6">
                                <p>Would you rather</p>
                                <p>{question.optionOne.text.substring(0, 5)}...</p>
                                <Link to={{pathname: `/questions/${question.id}`, params: {ansrwerd: false, user: user}}} className="btn btn-outline-success w-100">View Poll</Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default Unanswered;