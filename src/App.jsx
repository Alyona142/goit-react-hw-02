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

// const hanleClickByOption = option => {
//   setDEFAULT_FEEDBACK_DATA(prev => ({
//     ...prev, [option]: prev[option] + 1
//   }));
// };

const getLSFeedbackData = () => {
  return JSON.parse(localStorage.getItem('feedback-data')) || DEFAULT_FEEDBACK_DATA;
};

function App() {
  const [feedback, setFeedback] = useState(getLSFeedbackData);

  useEffect(() => {
    localStorage.setItem('feedback-data', JSON.stringif(feedback));
  }, [feedback]);

  const updateFeedback = feedbackType => {
    if (feedbackType === 'reset'){
      setFeedback(DEFAULT_FEEDBACK_DATA);
    }
    else {
      setFeedback({
        ...feedback,
        [feedbackType]: feedback[feedbackType] + 1,
      });
    }
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);
  
  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} isVisible={!totalFeedback} />
      {totalFeedback ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (<Notification />)}
    </>
  );

}

export default App;