import React, { useEffect } from "react"
import { useNavigation } from "@react-navigation/native" // Importe useNavigation depuis react-navigation/native
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, ScrollView, View, Button } from "react-native"

export const ChitChatsScreen = () => {
	const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL
	const navigation = useNavigation() // Utilise useNavigation pour obtenir l'objet de navigation

	// const fetchDatas = () => {
	// 	fetch("http://172.21.62.178:3333/")
	// 		.then((res) => {
	// 			if (!res.ok) {
	// 				throw new Error("Connexion non établie")
	// 			}
	// 			console.log("no response OK")
	// 		})
	// 		.then((data) => {
	// 			console.log("Connexion au backend réussie !")
	// 		})
	// 		.catch((error) =>
	// 			console.error("Une erreur s'est produite :", error.message)
	// 		)
	// }

	const fetchDatas = () => {
		console.log("je vais fetch")
		fetch("/connect")
			.then((res) => {
				console.log("réponse reçue du front : ", res)
			})
			.catch((error) =>
				console.error(
					"Une erreur s'est produite lors de l'appel :",
					error.message
				)
			)
	}

	useEffect(() => {
		console.log("Le composant ChitChatsScreen est monté")
		fetchDatas()
	}, [navigation])

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
