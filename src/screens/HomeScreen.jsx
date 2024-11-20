import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Button,
	Divider,
	Menu,
	Text,
	TextInput,
} from "react-native-paper";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
	const [ques, setQues] = useState(0);
	const [menuVisibilityType, setMenuVisibilityType] = useState(false);
	const [menuVisibilityDiff, setMenuVisibilityDiff] = useState(false);
	const [dificuilty, setDificuilty] = useState("easy");
	const [type, setType] = useState("multiple");
	const [isLoading, setisLoading] = useState(false);

	const openMenuType = () => setMenuVisibilityType(true);
	const openMenuDifficuilty = () => setMenuVisibilityDiff(true);
	const closeMenu = () => {
		setMenuVisibilityType(false);
		setMenuVisibilityDiff(false);
	};

	const fetchQuestions = async (no, diff, type) => {
		try {
			setisLoading(true);
			const response = await axios.get(
				`https://opentdb.com/api.php?amount=${no}&difficulty=${diff}&type=${type}`
			);
			console.log(response.data.results);

			navigation.navigate("Quiz", { questions: response.data.results });
		} catch (error) {
			console.error("Error fetching questions:", error);
		} finally {
			setisLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<TextInput
					label="No. of Questions"
					value={ques}
					onChangeText={(text) => setQues(text)}
					mode="outlined"
					keyboardType="numeric"
				/>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text variant="titleMedium">Select Difficuilty : </Text>
					<Menu
						visible={menuVisibilityDiff}
						onDismiss={closeMenu}
						anchor={<Button onPress={openMenuDifficuilty}>{dificuilty}</Button>}
						style={styles.menuStyle}
					>
						<Menu.Item
							onPress={() => {
								setDificuilty("easy");
								closeMenu();
							}}
							title="Easy"
						/>
						<Divider />
						<Menu.Item
							onPress={() => {
								setDificuilty("medium");
								closeMenu();
							}}
							title="Medium"
						/>
						<Divider />
						<Menu.Item
							onPress={() => {
								setDificuilty("Hard");
								closeMenu();
							}}
							title="Hard"
						/>
					</Menu>
				</View>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text variant="titleMedium">Select Type : </Text>
					<Menu
						visible={menuVisibilityType}
						onDismiss={closeMenu}
						anchor={<Button onPress={openMenuType}>{type}</Button>}
						style={styles.menuStyle}
					>
						<Menu.Item
							onPress={() => {
								setType("multiple");
								closeMenu();
							}}
							title="Multiple Choice"
						/>
						<Divider />
						<Menu.Item
							onPress={() => {
								setType("boolean");
								closeMenu();
							}}
							title="True / False"
						/>
					</Menu>
				</View>

				<Button
					onPress={() => fetchQuestions(ques, dificuilty, type)}
					mode="contained"
				>
					Go!
				</Button>
				<ActivityIndicator
					style={{ marginTop: 5 }}
					animating={isLoading}
					size="large"
				/>
			</View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	innerContainer: {
		width: 300,
		padding: 10,
	},
	menuStyle: {
		marginTop: 80,
	},
});
