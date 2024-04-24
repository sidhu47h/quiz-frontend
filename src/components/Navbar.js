import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const Navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('userInfo');

    const handleLogout = () => {
        // Clear the local storage
        localStorage.clear();
        Navigate('/')
    };
  return (
    <div className="bg-gray-800">
      <div className="h-16 px-8 flex items-center justify-between">
        <p className="text-white font-bold">Welcome to the QuizApp</p>
        {isLoggedIn && 
        <button onClick={handleLogout} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-2 mx-2 my-2'>Logout</button>}
      </div>
    </div>
  )
}

export default Navbar