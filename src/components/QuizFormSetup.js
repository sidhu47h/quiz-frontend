import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizService from '../services/QuizService';
import { useAuth } from '../components/AuthContext';
import { storeQuizInfo } from '../utils/Auth';
import { setQuestions } from '../utils/Auth';
import { storeQuizFileNames } from '../utils/Auth';


const QuizFormSetup = () => {
    const navigate = useNavigate();
    const {setQuizInfo} = useAuth();
    

    const [quizFileNames, setQuizFileNames] = useState([]);

    useEffect(() => {
        const storedNames = localStorage.getItem('quizFileNames');
        if (storedNames) {
            const parsedNames = JSON.parse(storedNames).questionFiles;
            setQuizFileNames(parsedNames);
        }
    }, []);
    // console.log(quizFileNames);

    const [quiz, setQuiz] = useState({
        quizFileName: '',
        noOfQuestions: '',
        timeLimit: '',
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setQuiz({ ...quiz, [e.target.name]: value});
    };
    
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    };


      
    const setQuizDetails = (e) => { 
        e.preventDefault();
        QuizService.setQuizDetails(quiz).then((response) => {
            if(response.data) {
                storeQuizInfo(quiz);
                setQuizInfo(quiz);
                setQuestions(response.data);
                console.log(response.data);
                navigate("/questions", {
                    state: { response: response.data }, // Added a comma after response.data
                });
            } else {
                alert('Invalid login')
            }
        }).catch((error) => {
            console.log(error) 
        });  
    };

    const handleUploadQuizFile = (e) => {
        QuizService.uploadQuizFile(file).then((response) => {
            alert('Quiz file uploaded successfully, Now select the quiz file name from the dropdown');
            QuizService.getQuizFiles().then((response) => {
                storeQuizFileNames(response.data);
            }).catch((error) => { 
                console.log(error) 
            });
            navigate('/quizFormSetup');
        }).catch((error) => { console.log(error) });
    };

  return (
    <div className='flex flex-col max-w-2xl mx-auto shadow border-b'>
        <div className='px-4 sm:px-8 py-8'>
            <div className='font-bold text-2xl tracking-wider'>
                <h1>Enter quiz details</h1>
            </div>
            <div className='flex flex-col items-start justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>
                    Select QuizFile
                </label>
                <select 
                    name="quizFileName"
                    value={quiz.quizFileName}
                    onChange={handleChange}
                    className='h-10 w-full border mt-2 px-2 py-2'>
                    <option value="">Please select a file</option>
                    {quizFileNames.map((file, index) => (
                        <option key={index} value={file}>
                            {file}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col items-start justify-center h-18 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>
                    Upload QuizFile
                </label>
                <input name="quizFile"
                        type='file' 
                        onChange={(e) => handleFileChange(e) }
                        className="h-12 w-full border mt-2 px-2 py-2"></input>
            </div>
            <div className="flex flex-col sm:flex-row items-start justify-start w-full my-4">
            {/* <input name="quizFile"
                        type='file' 
                        onChange={(e) => handleFileChange(e) }
                        className="h-10 w-full border mt-2 px-2 py-2"></input> */}
                <button onClick={handleUploadQuizFile} className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 mt-2 mb-2 py-2 px-4">Upload Quiz File</button>
            </div>

            {/* <div className='flex flex-col items-start justify-center h-14 w-full my-4'>
                <input 
                        name="quizFile"
                        type='file' 
                        onChange={(e) => handleFileChange(e) }
                        className='h-10 w-96 border mt-2 mr-2 mb-2 px-2 py-2'></input>
                        <button  onClick={handleUploadQuizFile} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 mt-2 mb-2 py-2 px-2'>Upload Quiz File</button>
            </div>                     */}
            <div className='flex flex-col items-start justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>
                    Enter the number of questions
                </label>
                <input name="noOfQuestions" value={quiz.noOfQuestions} onChange={(e) => handleChange(e) } type='number' className='h-10 w-full border mt-2 px-2 py-2'></input>
            </div>

            <div className='flex flex-col items-start justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>
                    Enter the time limit of the quiz
                </label>
                <input name="timeLimit" value={quiz.timeLimit} onChange={(e) => handleChange(e) } type='number' className='h-10 w-full border mt-2 px-2 py-2'></input>
            </div>

            <div className='flex flex-col items-start justify-center h-14 w-full my-4 py-4'>
                <button  onClick={setQuizDetails} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-2'>Start Quiz</button>
            </div>
        </div>
    </div>
  )
}

export default QuizFormSetup