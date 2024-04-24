// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    // console.log(context);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

export const AuthProvider = ({ children }) => {
    const [authInfo, setAuthInfo] = useState({
        isAuthenticated: false,
        username: '',
        quiz: {
        questionFileName: '',
        noOfQuestions: '',
        timeLimit: '',
        correctAnswers: 0,
        totalQuestions: 0,
        },
    });

    const login = (username) => {
        if(!username) return;
        setAuthInfo(prevState => ({
          ...prevState,
          isAuthenticated: true,
          username: username
        }));
      };
      
      const setQuizInfo = (quiz) => {
        if(!quiz) return;
        setAuthInfo(prevState => ({
          ...prevState,
          isAuthenticated: true,
          quiz: quiz
        }));
      };
      
      const logout = () => {
        setAuthInfo({
          isAuthenticated: false,
          username: '',
          quiz: null
        });
      };
    return (
        <AuthContext.Provider value={{ ...authInfo, login, logout, setQuizInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
