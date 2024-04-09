import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Image } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse"
import { ChitChatsScreen } from "@screens/ChitChatsScreen"
import { HomeScreen } from "@screens/HomeScreen"

const Tab = createBottomTabNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused }) => {
						if (route.name === "Home") {
							return (
								<FontAwesomeIcon
									icon={faHouse}
									size={20}
									color={focused ? "#004AAD" : "rgba(81, 98, 119, 0.7)"}
								/>
							)
						} else if (route.name === "ChitChats") {
							const handleIcon = focused
								? require("./assets/iconTabChitChatActive.png")
								: require("./assets/iconTabChitChatInactive.png")
							return (
								<Image source={handleIcon} style={{ width: 25, height: 25 }} />
							)
						}
					},
					tabBarActiveTintColor: "#004AAD",
					tabBarInactiveTintColor: "rgba(81, 98, 119, 0.7)",
				})}>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="ChitChats" component={ChitChatsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}
