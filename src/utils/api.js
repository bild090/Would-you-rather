import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer

  } from './_DATA.js'
  
  export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions,
    }))
  }
  
  export function saveQuestion (info) {
    console.log("API Save", info);
    return _saveQuestion(info)
  }
  
  export function saveQuestionAnswer (info) {
    console.log("info : " , info);
    return _saveQuestionAnswer(info)
  }