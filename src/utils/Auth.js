const quizObj = {
    quiz: {
    questionFileName: '',
    noOfQuestions: '',
    timeLimit: '',
    correctAnswers: 0,
    totalQuestions: 0,
    }}

export const storeQuizFileNames = (quizFileNames) => {
    localStorage.setItem('quizFileNames', JSON.stringify(quizFileNames));
}

export const getQuizFileNames = () => {
    localStorage.getItem('quizFileNames');
}

export const storeResultInfo = (resultInfo) => {
    localStorage.setItem('resultInfo', JSON.stringify(resultInfo));
  };

  export const getResultInfo = () => {
    const storedResultInfo = localStorage.getItem('resultInfo');
    return storedResultInfo ? JSON.parse(storedResultInfo) : null;
  };

export const storeLoginInfo = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('isAuthenticated', true);
  };

  
  export const getQuizInfo = () => {
    const quizInfo = localStorage.getItem('quizInfo');
    return quizInfo ? JSON.parse(quizInfo) : null;
  };

  export const storeQuizInfo = (quizInfo) => {
    quizObj.quiz = quizInfo;
    localStorage.setItem('quizInfo', JSON.stringify(quizInfo));
  };
  
  // Function to retrieve login information from local storage
  export const getLoginInfo = () => {
    const storedUserInfo = localStorage.getItem('userInfo');
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  };
  
  // Function to remove login information from local storage
  export const removeLoginInfo = () => {
    localStorage.removeItem('userInfo');
  };

  export const setQuestions = (questions) => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }
  
  export const getQuestions = () => {
    const storedQuestions = localStorage.getItem('questions');
    return storedQuestions ? JSON.parse(storedQuestions) : null;
  }

  export const setAlertShownToFalse = () => {
    localStorage.setItem('isAlertShown', false);
  }

  export const setAlertShownToTrue = () => {
    localStorage.setItem('isAlertShown', true);
  }

  export const getAlertShown = () => {
    return localStorage.getItem('isAlertShown');
  }
