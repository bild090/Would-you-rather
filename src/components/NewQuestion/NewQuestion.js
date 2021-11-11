import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { handleAddQuestion } from '../../actions/questions';
import './NewQuestion.css'

const NewQuestion = ({ user }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [op1, setOp1] = useState("")
    const [op2, setOp2] = useState("")

    const opHandler = (e) => {
        console.log(e.target.value);

        e.preventDefault()
       if(e.target.name === "op1"){
           setOp1(e.target.value)
       }
       else{
           setOp2(e.target.value)
       }
    }

    const submitQuestionHandler = (e) => {
        e.preventDefault()
        if(op1 !== ""  && op2 !== ""){
            const question = {
                author: user,
                optionOneText: op1,
                optionTwoText: op2
            }
            console.log("question : ", question);
             dispatch(handleAddQuestion(question))
             history.push("/home");
        }
    }

    return (
        <div className="new-question d-flex justify-content-center">
            <div className="card w-50">
                <div className="bg-color">
                    <h4 className="text-center p-2"> Create New Question </h4>
                </div>
                <div className="p-3"> 
                    <div>
                        <p> Complate the question </p>
                        <h5> Would you rather </h5>
                    </div>
                    <div className="mt-2">
                        <form>
                            <input onChange={(e) =>{ opHandler(e) }} className="form-control" type="text" name="op1"  placeholder="Enter Option One Text Here" required />
                            <div className="d-flex justify-content-center">
                                <hr />
                                <strong className="mx-3">OR</strong>
                                <hr />
                            </div>
                            <input onChange={(e) =>{ opHandler(e) }} className="form-control" type="text" name="op2" placeholder="Enter Option One Text Here" required />
                            <button onClick={(e) => { submitQuestionHandler(e) }} type="submit"> Submit </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewQuestion;