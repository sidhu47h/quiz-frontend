import React from 'react'
import QuizService from '../services/QuizService'
import { getLoginInfo } from '../utils/Auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CumulativeResult = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState('');
    
    useEffect(() => {
        const user = {
            username: getLoginInfo(),
        };

        QuizService.getCumulativeResults(user).then((response) => {
            setResult(response.data); // Set result in state
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });

        
    }, []); 
    
    const handleStartQuizAgain = () => {
        localStorage.removeItem('questions');
        navigate('/getQuestionFiles');
    };

    return (
        <div className="flex max-w-6xl mx-auto shadow border-b">
            <div className='px-8 py-8'>
                <h1>Your cumulative results are</h1><br></br>
                {result.split('\n').map((quizResult, index) => (
                    <div key={index}>                    
                        <p>{quizResult}</p>                    
                    </div>
                ))}
                <button onClick={handleStartQuizAgain} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 my-2 py-2 px-2'>Start Quiz Again</button>
            </div>
        </div>
    );
}

export default CumulativeResult