import React, { useState } from "react"
import { StyleSheet, TextInput } from "react-native"

export const Input = () => {
	const [value, setValue] = useState<string>("")

	return (
		<TextInput
			style={styles.input}
			placeholder="Choisis un pseudo !"
			onChangeText={(newText) => setValue(newText)}
			defaultValue={value}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		fontSize: 12,
		width: 200,
		height: 40,
		backgroundColor: "#ffff",
		paddingVertical: 7,
		paddingHorizontal: 5,
		marginTop: 8,
		borderBottomColor: "#004AAD",
		borderBottomWidth: 1,
	},
})
