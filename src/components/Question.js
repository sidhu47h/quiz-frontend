import React, { useState } from 'react';
import { getQuestions } from '../utils/Auth';
import { storeResultInfo } from '../utils/Auth';
import { useEffect } from 'react';
import { getQuizInfo } from '../utils/Auth';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginInfo} from '../utils/Auth';
import QuizService from '../services/QuizService';

function App() {
  const navigate = useNavigate();
  const questions = getQuestions();
  // console.log(questions);
  const totalQuestions = questions.length;
  
  if (questions.length === 0) {
    navigate('/questionsUnavailable'); 
  }

  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(getQuizInfo().timeLimit);
  const quizInfo = getQuizInfo();
  const handleQuizCompletion = useCallback((finalScore) => {
    const currentDate = new Date().toLocaleString();
    const timeTaken = quizInfo.timeLimit - timer;
    const result = {
      quizName: quizInfo.quizFileName,
      userName: getLoginInfo(), 
      correctAnswers: finalScore, // Use finalScore passed as parameter
      totalQuestions,
      totalTimeTaken: timeTaken,
      date: currentDate,
    }
    QuizService.storeResult(result);
    storeResultInfo(result);
    navigate('/results');
    // alert(`Quiz completed! Your score: ${finalScore}/${totalQuestions}`);
    setTimer(0); // Stop the timer
    // Reset quiz or handle completion
  }, [quizInfo, timer, navigate, totalQuestions]);
  // setScore(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
        handleQuizCompletion();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [handleQuizCompletion, timer]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // console.log(score);
  const handleNextQuestion = () => {
    const isCorrectAnswer = (parseInt(selectedOption) + 1) === parseInt(questions[currentQuestion].answer);
    if (isCorrectAnswer) {
      alert('Correct Answer');
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (currentQuestion === questions.length - 1) {
          handleQuizCompletion(newScore); // Pass newScore directly
        }
        return newScore;
      });
    } else {
      alert('Wrong Answer');
      if (currentQuestion === questions.length - 1) {
        handleQuizCompletion(score); // Pass current score if the answer is wrong
      }
    }
  
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedOption("");
    }
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto shadow border-b">
      <div className='px-4 sm:px-8 py-8'>
        {questions.length > 0 && (
          <div>
            <h1>Timer: {timer} seconds</h1>
            <h2>{questions[currentQuestion].questionText}</h2>
            <form className='items-center justify-center w-full my-4'>
              {questions[currentQuestion].options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    value={index.toString()}
                    checked={selectedOption === index.toString()}
                    onChange={handleOptionChange}
                  />
                  {option}
                  <br />
                </label>
              ))}
            </form>
            <button onClick={handleNextQuestion} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-2'>Next Question</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
