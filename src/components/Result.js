import React from 'react';
import { getResultInfo } from '../utils/Auth';
import { useNavigate} from 'react-router-dom';

const Result = () => {
    const navigate = useNavigate();
    const resultInfo = getResultInfo();
    localStorage.removeItem('questions');
    localStorage.removeItem('quizInfo');

    const handleCumulativeResults = () => {
        navigate('/cumulativeResults');
    };

    const handleStartQuizAgain = () => {
        navigate('/getQuestionFiles');
    };

    return (
        <div className='flex max-w-2xl mx-auto shadow border-b'>
            <div className='px-8 py-8'>
                <div className='font-thin text-2xl tracking-wider'>
                    <strong>
                        <h1>Quiz finished!!! your results are</h1>
                    </strong>
                </div>
                <div className='items-center justify-center  w-full my-4'>
                    <label className='block text-gray-600 text-sm font-normal'>
                        Total Questions:
                    </label>
                    <h3>{resultInfo.totalQuestions}</h3>
                    <br></br>
                    <label className='block text-gray-600 text-sm font-normal'>
                        Correct Answers:
                    </label>
                    <h3>{resultInfo.correctAnswers}</h3>
                    <br></br>
                    <label className='block text-gray-600 text-sm font-normal'>
                        Time Taken:
                    </label>
                    <h3>{resultInfo.totalTimeTaken} seconds</h3>
                    <br></br>
                    <button
                        onClick={handleCumulativeResults}
                        className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-2 mx-2 my-2'
                    >
                        See Cumulative Results
                    </button>
                    <button
                        onClick={handleStartQuizAgain}
                        className='rounded text-white font-semibold bg-gray-400 hover:bg-gray-700 py-2 px-2 mx-2 my-2'
                    >
                        Start Quiz Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Result;
