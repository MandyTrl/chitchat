import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChitChatsScreen from "./screens/ChitChatsScreen"
import HomeScreen from "./screens/HomeScreen"

const Tab = createBottomTabNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Welcome" component={HomeScreen} />
				<Tab.Screen name="ChitChats" component={ChitChatsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}
