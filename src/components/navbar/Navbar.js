import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom';
import { reSetAuthedUser } from '../../actions/authedUser';
import './Navbar.css'


const Navbar = ({user, logged, users, userLogged}) => {

    const history = useHistory()
    const dispatch = useDispatch()

    console.log("user login : ", logged);

    const logoutHandler = () => {

        dispatch(reSetAuthedUser(user))
        userLogged("", false)
        history.push("/notFound")
    }

    return (
        <div className="navbar row m-3 p-2 ">
            <div className="col-6 d-flex justify-content-evenly mb-3">
                <Link to={logged ? "/home" : "/"}> Home </Link>
                <Link to={logged ? "/add" : "/"}> New Question </Link>
                <Link to={logged ? "/leaderboard" : "/"}> Leader Board </Link>
            </div>
            <div className="col-6">
                {users && logged &&
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <p> Hello, {users[user].name} </p>
                            <img className="mx-3" src={users[user].avatarURL} alt="" width="32px" height="32px" />
                        </div>
                        <p className="logout" onClick={logoutHandler}> Logout </p>
                    </div>}
            </div>
            <hr />
        </div>

    )
}


export default Navbar