import React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, ScrollView, Button, View, Image } from "react-native"
import { Input } from "@components/Input"

export const HomeScreen = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Image
				source={require("../assets/chitchatlogo.png")}
				style={styles.logo}
			/>
			<Text style={styles.title}>ChitChat</Text>

			<Text style={styles.label}>Pseudo</Text>
			<Input />
			<StatusBar style="auto" />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffe5d9",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 32,
		fontStyle: "italic",
		fontWeight: "700",
		color: "#004AAD",
		backgroundColor: "#ffff",
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20,
		marginTop: 8,
	},
	label: {
		fontSize: 20,
		fontWeight: "600",
		color: "#004AAD",
		marginTop: 40,
	},
	logo: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
	},
})
