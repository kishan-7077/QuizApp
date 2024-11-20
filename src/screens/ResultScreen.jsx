import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Card } from "react-native-paper";

const ResultScreen = ({ route, navigation }) => {
	const { score, totalQuestions, questions } = route.params;

	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Content>
					<Text style={styles.resultText}>Quiz Completed!</Text>
					<Text style={styles.scoreText}>
						Your Score: {score} / {totalQuestions}
					</Text>
					<Button
						mode="contained"
						style={styles.button}
						onPress={() => navigation.navigate("Home")}
					>
						Go Home
					</Button>
					<Button
						mode="contained"
						style={styles.button}
						onPress={() => navigation.navigate("Quiz", { questions })}
					>
						Retry Quiz
					</Button>
				</Card.Content>
			</Card>
		</View>
	);
};

export default ResultScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#F5F5F5",
	},
	card: {
		width: "100%",
		padding: 20,
	},
	resultText: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	scoreText: {
		fontSize: 20,
		textAlign: "center",
		marginBottom: 20,
	},
	button: {
		marginVertical: 10,
	},
});
