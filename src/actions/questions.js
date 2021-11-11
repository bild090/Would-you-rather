import { saveQuestion, saveQuestionAnswer } from "../utils/api"
import { addAnswerToUser } from "./users";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

function addQuestion(question) {
	return {
		type: SAVE_QUESTION,
		question
	};
}

function addAnswer({ qid, answer, authedUser }) {
	return {
		type: ADD_ANSWER,
		answerInfo: {
			qid,
			answer,
			authedUser
		}
	};
}

export function handleAddQuestion(question) {
	return (dispatch) => {

		console.log("Action : ", question);

		return saveQuestion({
			optionOneText: question.optionOneText,
			optionTwoText: question.optionTwoText,
			author: question.author
		})
			.then((question) => {
				dispatch(addQuestion(question))
			}
			)
	}
}

export function handleAddAnswer(qid, answer, authedUser) {
	return (dispatch) => {

		return saveQuestionAnswer({
			qid,
			answer,
			authedUser
		})
			.then(() =>
				dispatch(
					addAnswer({
						qid,
						answer,
						authedUser
					})
				),
				dispatch(
					addAnswerToUser({
						qid,
						answer,
						authedUser
					})
				)
			)
	};
}