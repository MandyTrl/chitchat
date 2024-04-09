import React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, ScrollView, Button, View, Image } from "react-native"
import { Input } from "@components/Input"

export const HomeScreen = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Image
				source={require("../assets/chitchatlogo.gif")}
				style={styles.logo}
			/>
			<Text style={styles.title}>ChitChat</Text>

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
		paddingHorizontal: 40,
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
	logo: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
	},
})
