import React from 'react'
import { useNavigate } from 'react-router-dom';


const QuestionsUnavailable = () => {
    const navigate = useNavigate();
    const handleSelectLessQuestions = () => { 
        navigate("/getQuestionFiles");
    };

  return (
    <div className="flex max-w-6xl mx-auto shadow border-b">
            <div className='px-8 py-8'>
                <strong><h1>Questions unavailable.</h1></strong><br></br>
                <h2>Seems like you have used all the questions in the question file</h2>
                <h2>Please select a different question file or select less number of questions</h2>
                <button onClick={handleSelectLessQuestions} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 my-2 py-2 px-2'>Change quiz options</button>
            </div>
        </div>
  )
}

export default QuestionsUnavailable