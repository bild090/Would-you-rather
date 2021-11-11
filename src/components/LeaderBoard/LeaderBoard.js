import { useSelector } from "react-redux"

import './LeaderBoard.css'

const LeaderBoard = () => {

    const users = useSelector(state => state.users)
    const questions = useSelector(state => state.questions)

    let user = []
    let asCount = 0
    let crCount = 0
    let q = Object.values(questions)
    let u = Object.values(users)

    for (let i = 0; i < u.length; i++) {
        for (let j = 0; j < q.length; j++) {
            if (q[j].author === u[i].id) {
                crCount++
            }
            if (q[j].optionOne.votes.includes(u[i].id) || q[j].optionTwo.votes.includes(u[i].id)) {
                asCount++
            }
        }
        user.push({
            name: u[i].name,
            avatarURL: u[i].avatarURL,
            asCount: asCount,
            crCount: crCount,
            score: asCount + crCount
        })
        asCount = 0
        crCount = 0
    }

    const compare = (a, b) => {
        if (a.score > b.score) {
            return -1;
        }
        if (a.score < b.score) {
            return 1;
        }
        return 0;
    }

    user.sort(compare);
    console.log("Leaderboard : ", user);

    u = u[0]
    q = q[0]

    return (
        <div className="leader-board mx-5 container">
                {user && user.map(user => {
                    return (
                        <div className="card mx-5 mt-3 p-4 w-50">
                            <div className="order"> 1 </div>
                            <div className="row">
                                <div className="dash col-2 d-flex justify-content-center align-items-center">
                                    <img src={user.avatarURL} alt="user Avatar" width="80px" height="80px" />
                                </div>
                                <div className="col-6 dash">
                                    <h4 className="mx-2"> {user.name} </h4>
                                    <div className="d-flex flex-row justify-content-between mx-2">
                                        <p>Answerd Questionns</p>
                                        <p>{user.asCount}</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between mx-2">
                                        <p>Created Questionns</p>
                                        <p>{user.crCount}</p>
                                    </div>
                                </div>
                                <div className="col-3 d-flex justify-content-end">
                                    <div className="d-flex flex-column w-75 mx-3 mt-3">
                                        <div className="card p-2 text-center score">Score</div>
                                        <div className="card p-3 text-center">
                                            <div className="score-number ">
                                                {user.score}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default LeaderBoard