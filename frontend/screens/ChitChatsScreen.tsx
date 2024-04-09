import React, { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, ScrollView, View, Button } from "react-native"

export const ChitChatsScreen = () => {
	const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL
	console.log(backendUrl)

	useEffect(() => {
		if (backendUrl) {
			fetch(backendUrl)
				// .then((res) => res.json())
				// .then((data) => console.log(data))
				.then(() => console.log("Connexion au backend réussi !"))
				.catch((error) =>
					console.error(
						"Une erreur s'est produite lors de la récupération des données :",
						error
					)
				)
		} else {
			console.log(
				"Une erreur s'est produite lors de la récupération de l'url du backend",
				backendUrl
			)
		}
	}, [])

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
