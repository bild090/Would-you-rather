import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { handleInitialData } from './actions/shared'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import Home from './components/Home/Home'
import ViewPoll from './components/ViewPoll/ViewPoll'
import NewQuestion from './components/NewQuestion/NewQuestion'
import LeaderBoard from './components/LeaderBoard/LeaderBoard'
import Error404 from './components/Errors/Error404/Error404'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'

function App() {

  const [user, setUser] = useState("")
  const [logged, setLogged] = useState(false)

  const users = useSelector(state => state.users)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(handleInitialData())
  }, [])


  const userLogged = (user, logged) => {
    setUser(user)
    setLogged(logged)
    localStorage.setItem('logged', 'true')
    console.log("App login : ", localStorage.getItem('logged'));

  }

  console.log("App login2 : ", localStorage.getItem('logged'));


  return (
    <div className="container">
      <Router>
        <Fragment>
          <Navbar userLogged={userLogged} user={user} logged={logged} users={users} />
          <Switch>
            <PrivateRoute path="/home" logged={logged}>
              <Home user={user} />
            </PrivateRoute>
            <PrivateRoute path="/add" logged={logged}>
              <NewQuestion user={user} />
            </PrivateRoute>
            <PrivateRoute path="/leaderboard" logged={logged}>
              <LeaderBoard />
            </PrivateRoute>
            <PrivateRoute path='/questions/:question_id' logged={logged}>
              <ViewPoll />
            </PrivateRoute>
            <Route exact path="/">
              <Login uesrs={users} userLogged={userLogged} />
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Fragment>
      </Router>
    </div>
  )
}

export default App