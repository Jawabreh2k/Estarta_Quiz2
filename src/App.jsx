import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  CssBaseline,
} from "@mui/material";
import Quiz from "./components/Quiz";
import "./App.css";
import "./styles.css";
const App = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => setTopics(data.topics));
  }, []);

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
  };

  const handleTopicDeselection = () => {
    setSelectedTopic(null);
  };

  return (
    <Container maxWidth="sm" className="container">
      <Box mt={3}>
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to the Quiz App
        </Typography>
        {!selectedTopic && (
          <Typography variant="body1" align="center" gutterBottom>
            Test your knowledge with our quizzes! Each quiz has 10 questions
            worth 10 marks in total.
          </Typography>
        )}
      </Box>
      {!selectedTopic ? (
        <Box
          mt={3}
          sx={{
            display: "grid",
            gridGap: "1rem",
          }}
        >
          {topics.map((topic, index) => (
            <Card key={index} className="quiz-card">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {topic.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {topic.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleTopicSelection(topic)}
                >
                  Start Quiz
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        <Quiz
          topic={selectedTopic}
          onTopicDeselection={handleTopicDeselection}
        />
      )}
    </Container>
  );
};

export default App;
