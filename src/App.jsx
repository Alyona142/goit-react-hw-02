import { useEffect, useState } from 'react';
import './App.css';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';


const DEFAULT_FEEDBACK_DATA = {
  good: 0,
  neutral: 0,
  bad: 0,
};


const getLSFeedbackData = () => {
  return JSON.parse(localStorage.getItem('feedback-data')) || DEFAULT_FEEDBACK_DATA;
};

function App() {
  
  const [feedback, setFeedback] = useState(getLSFeedbackData);


  useEffect(() => {
    localStorage.setItem('feedback-data', JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };


  const resetFeedback = () => {
    setFeedback(DEFAULT_FEEDBACK_DATA);
  };

 
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

 
  const positiveFeedback = totalFeedback > 0
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  return (
    <>
      <Description />
      <Options 
        updateFeedback={updateFeedback} 
        resetFeedback={resetFeedback} 
        isVisible={totalFeedback > 0} 
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;