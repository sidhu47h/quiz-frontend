import './App.css';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizFormSetup from './components/QuizFormSetup';
import Question from './components/Question';
import CumulativeResult from './components/CumulativeResult';
import { AuthProvider } from './components/AuthContext';
import Result from './components/Result';
import QuestionsUnavailable from './components/QuestionsUnavailable';

function App() {
  return (
  <>
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route index element={<LoginForm />}></Route>
        <Route path="/getQuestionFiles" element={<QuizFormSetup />}></Route>
        <Route path="/questionsUnavailable" element={<QuestionsUnavailable />}></Route>
        <Route path="/questions" element={<Question />}></Route>
        <Route path="/results" element={<Result />}></Route>
        <Route path="/cumulativeResults" element={<CumulativeResult />}></Route>
      </Routes>
      
    </BrowserRouter>
  </AuthProvider>
  </>);
}

export default App;
