import { useState } from "react";
import Answerd from "./Answerd";

import './Home.css'

import Unanswered from "./Unanswered";

const Home = ({user}) => {

    const [switcher, setSwitcher] = useState(true)

    const switcherHandler = () => {
        const newState = !switcher
        setSwitcher(newState)
    }

    console.log("Home login : ", localStorage.getItem('loggedin'));

    return (
        <div className="home d-flex justify-content-center">
            <div className="card w-50">
                <div className="row pb-0">
                    <div className="col-6">
                        <p onClick={switcherHandler} className={switcher ? "p-3 px-3 text-center active" : "p-3 px-3 text-center"}>Unanswered Questions</p>
                    </div>
                    <div className="col-6">
                        <p onClick={switcherHandler} className={switcher ? "p-3 px-3 text-center" : "p-3 px-3 text-center active"}>Answerd Questionns</p>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    {switcher ? <Unanswered user={user} /> : <Answerd user={user} />}
                </div>
            </div>
        </div>
    )
}

export default Home;