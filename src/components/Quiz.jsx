import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore, resetScore } from "../redux/actions";
import {
  Typography,
  Button,
  Box,
  List,
  ListItem,
  LinearProgress,
} from "@mui/material";
import "../styles.css";

const Quiz = ({ topic, onTopicDeselection }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(topic.timeLimit);
  const score = useSelector((state) => state.score);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timeRemaining <= 0) {
      setShowResults(true);
      return;
    }

    const countdown = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestionIndex, timeRemaining]);

  const progressPercentage =
    (currentQuestionIndex / topic.questions.length) * 100;

  const handleAnswer = (selectedOption) => {
    if (
      selectedOption === topic.questions[currentQuestionIndex].correctAnswer
    ) {
      dispatch(incrementScore());
    }

    if (currentQuestionIndex + 1 < topic.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    dispatch(resetScore());
    setCurrentQuestionIndex(0);
    setShowResults(false);
    onTopicDeselection();
  };

  return (
    <Box
      sx={{
        background: "#f5f5f5",
        borderRadius: "1rem",
        padding: "2rem",
        marginTop: "1rem",
      }}
    >
      {/* Display the timer */}
      <Box textAlign="center">
        <Typography variant="h5" align="center" className="timer" gutterBottom>
          Time remaining: {timeRemaining} seconds
        </Typography>
      </Box>

      {!showResults && (
        <>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ height: "3rem", paddingBottom: "5rem" }}
            align="center"
            justifyContent="center"
          >
            {topic.questions[currentQuestionIndex].question}
          </Typography>
          <LinearProgress variant="determinate" value={progressPercentage} />
          <Box mt={2}>
            <List>
              {topic.questions[currentQuestionIndex].options.map(
                (option, index) => (
                  <ListItem key={index}>
                    <Button
                      variant="outlined"
                      onClick={() => handleAnswer(index)}
                      className="quiz-button"
                    >
                      {option}
                    </Button>
                  </ListItem>
                )
              )}
            </List>
          </Box>
        </>
      )}

      {showResults && (
        <Box textAlign="center">
          <Typography variant="h2" component="h2" gutterBottom>
            Results
          </Typography>
          <Typography variant="body1" sx={{ paddingBottom: "4rem" }}>
            You scored {score} out of {topic.questions.length} questions.
          </Typography>
          <Button variant="contained" onClick={resetQuiz}>
            Try another topic
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Quiz;
