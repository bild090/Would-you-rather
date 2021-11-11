import { getInitialData, saveQuestion } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions, handleAddQuestion } from '../actions/questions'


export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions, authUser }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
      })
  }
}

export function handleSaveQuestion(question) {
  return (dispatch) => {
    return saveQuestion(question)
      .then(({ question }) => {
        dispatch(handleAddQuestion(question))
      })
  }
}