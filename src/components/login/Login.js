import {  useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router'


import './Login.css'
import Game from '../../image/game.png'
import { setAuthedUser } from '../../actions/authedUser'

const Login = ({ userLogged }) => {

    const { state } = useLocation()
    const dispatch = useDispatch()
    const [signin, setSignin] = useState(false)
    const [user, setUser] = useState()
    const history = useHistory()
    const users = useSelector(state => state.users)

    const loginHandler = (e) => {
        e.preventDefault()
        if (e.target.value !== "") {
            setSignin(true)
            setUser(e.target.value)
        }
    }
    const singin = () => {
        if (signin) {
            dispatch(setAuthedUser(user))
            userLogged(user, true)
            console.log("Sateeee : ", state);
            if(state?.from.pathname){
                history.push(state?.from.pathname)
            }
            else{
                history.push('/home')
            }
        }
    }
    return (
        <div className="row login d-flex justify-content-center ">
            <div className="col-5 ">
                <div className="card d-flex justify-content-center">
                    <div className="d-flex justify-content-center header pt-2">
                        <div>
                            <h5>Welcome To The Would Rather App!</h5>
                            <p className="d-flex justify-content-center"> Please sigin in to continue </p>
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="d-flex justify-content-center m-3">
                            <img src={Game} alt="game" width="70px" height="120px" />
                        </div>
                        <div>
                            <h4> Log in </h4>
                        </div>
                        <div>
                            <select onChange={(e) => { loginHandler(e) }} className="form-select" >
                                <option value="">Open this select menu</option>
                                {users && Object.values(users).map(user => {
                                    return (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mt-3">
                            <button onClick={singin} type="submit" className="btn w-100"> Sign In </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Login