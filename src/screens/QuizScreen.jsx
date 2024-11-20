import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, Card, Paragraph } from "react-native-paper";

const QuizScreen = ({ route, navigation }) => {
	const { questions } = route.params;
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	const currentQuestion = questions[currentQuestionIndex];
	const answers = [
		...currentQuestion.incorrect_answers,
		currentQuestion.correct_answer,
	].sort();

	const handleAnswerPress = (answer) => {
		setSelectedAnswer(answer);
		if (answer === currentQuestion.correct_answer) {
			setScore(score + 1);
		}
	};

	const handleNextPress = () => {
		setSelectedAnswer(null);
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			navigation.navigate("Result", {
				score,
				totalQuestions: questions.length,
				questions,
			});
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Card style={styles.card}>
				<Card.Content>
					<Text style={styles.questionText}>
						{decodeURIComponent(currentQuestion.question)}
					</Text>
					{answers.map((answer, index) => (
						<Button
							key={index}
							mode="outlined"
							style={[
								styles.answerButton,
								selectedAnswer === answer && styles.selectedAnswerButton,
							]}
							onPress={() => handleAnswerPress(answer)}
							disabled={selectedAnswer !== null}
						>
							{decodeURIComponent(answer)}
						</Button>
					))}
					{selectedAnswer && (
						<Button
							mode="contained"
							style={styles.nextButton}
							onPress={handleNextPress}
						>
							Next
						</Button>
					)}
				</Card.Content>
			</Card>
		</ScrollView>
	);
};

export default QuizScreen;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#F5F5F5",
	},
	card: {
		width: "100%",
		marginBottom: 20,
	},
	questionText: {
		fontSize: 20,
		marginBottom: 20,
		textAlign: "center",
	},
	answerButton: {
		marginVertical: 5,
	},
	selectedAnswerButton: {
		backgroundColor: "#d3d3d3",
	},
	nextButton: {
		marginTop: 20,
	},
});
