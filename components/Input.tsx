import React, { useState } from "react"
import { StyleSheet, View, TextInput, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightToBracket"

export const Input = () => {
	const [value, setValue] = useState<string>("")
	const pseudoSelected = value !== ""

	const [handleFocused, setHandleFocused] = useState<boolean>(false)
	const handleLabel = (!handleFocused && !pseudoSelected) || handleFocused
	const handleIcon = !handleFocused && pseudoSelected

	return (
		<SafeAreaView style={styles.container}>
			{handleLabel && <Text style={styles.label}>Pseudo</Text>}

			<View style={styles.inputContainer}>
				<TextInput
					style={
						handleFocused
							? styles.inputFocused
							: pseudoSelected
							? styles.pseudoSelected
							: styles.input
					}
					placeholderTextColor={
						handleFocused ? "rgba(81, 98, 119, 0.6)" : "rgba(81, 98, 119, 1)"
					}
					placeholder="Choisis un pseudo"
					onChangeText={(newText) => setValue(newText)}
					onFocus={() => setHandleFocused(true)}
					onBlur={() => setHandleFocused(false)}
					defaultValue={value}
					spellCheck
					selectTextOnFocus
				/>
				{handleIcon && (
					<FontAwesomeIcon
						icon={faArrowRightToBracket}
						size={30}
						color="#004AAD"
					/>
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: 22,
		fontWeight: "600",
		color: "#004AAD",
		marginTop: 40,
		alignSelf: "flex-start",
	},
	inputContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
	},
	input: {
		fontSize: 16,
		width: "100%",
		paddingHorizontal: 3,
		paddingTop: 1,
		marginTop: 14,
		color: "#004AAD",
		borderBottomColor: "#004AAD",
		borderBottomWidth: 1,
	},
	pseudoSelected: {
		fontSize: 24,
		width: "auto",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		fontWeight: "700",
		height: 55,
		paddingTop: 1,
		marginTop: 10,
		marginRight: 8,
		color: "#004AAD",
		borderBottomColor: "#004AAD",
		borderBottomWidth: 1,
	},
	inputFocused: {
		fontSize: 18,
		width: "100%",
		height: 55,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		paddingHorizontal: 8,
		paddingVertical: 0,
		paddingTop: 1,
		marginTop: 10,
		color: "#004AAD",
		borderBottomColor: "#004AAD",
		borderBottomWidth: 1,
	},
})
