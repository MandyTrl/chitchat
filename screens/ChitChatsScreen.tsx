import React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, ScrollView, View, Button } from "react-native"

export const ChitChatsScreen = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Tous les chats</Text>
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
		fontWeight: "700",
		backgroundColor: "#ffff",
		padding: 20,
		borderRadius: 20,
	},
})
