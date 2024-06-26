import axios from "axios";

// const QUIZ_SERVICE_API_URL = "https://localhost:8080";
const QUIZ_SERVICE_API_URL = "https://13.52.252.112:443";

// const QUIZ_SERVICE_API_URL = "http://54.152.119.212:8080";

class QuizService {
    authenticate(user) {
        return axios.post(`${QUIZ_SERVICE_API_URL}/authenticate`, user);
    }

    setQuizDetails(quiz) {
        return axios.post(`${QUIZ_SERVICE_API_URL}/questions`, quiz);
    }

    storeResult(result) {
        // console.log(result);
        return axios.post(`${QUIZ_SERVICE_API_URL}/storeResult`, result);
    }

    getCumulativeResults(user) {
        return axios.post(`${QUIZ_SERVICE_API_URL}/cumulativeResults`, user);
    }

    async uploadQuizFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`${QUIZ_SERVICE_API_URL}/uploadQuestionFile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    }

    getQuizFiles() {
        return axios.get(`${QUIZ_SERVICE_API_URL}/getQuestionFiles`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new QuizService();