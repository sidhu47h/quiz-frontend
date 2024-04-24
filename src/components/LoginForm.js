import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import QuizService from '../services/QuizService';
import { storeLoginInfo } from '../utils/Auth';
import { storeQuizFileNames } from '../utils/Auth';

const LoginForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value});
    };

    const authenticate = (e) => { 
        e.preventDefault();
        QuizService.authenticate(user).then((response) => {
            if(response.data === true) {
                storeLoginInfo(user.username);
                // login(user.username);
                navigate('/getQuestionFiles');
            } else {
                alert('Invalid login')
            }
        }).catch((error) => {
            console.log(error) 
        });
        QuizService.getQuizFiles().then((response) => {
            storeQuizFileNames(response.data);
        }).catch((error) => { 
            console.log(error) 
        });
    };

  return (
    <div className='flex max-w-2xl mx-auto shadow border-b'>
        <div className='px-8 py-8'>
            <div className='font-thin text-2xl tracking-wider'>
                <h1>Enter login info</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>
                    Username
                </label>
                <input 
                    name="username"
                    value={user.username} 
                    type='text' 
                    onChange={(e) => handleChange(e) }
                    className='h-10 w-96 border mt-2 px-2 py-2'></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>
                    Password
                </label>
                <input name="password" value={user.password} onChange={(e) => handleChange(e) } type='password' className='h-10 w-96 border mt-2 px-2 py-2'></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4 py-4'>
                <button onClick={authenticate} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-2'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default LoginForm