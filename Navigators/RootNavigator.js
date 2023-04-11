import AuthNavigator from "./AuthNavigator";
import HomeNavigator from "./HomeNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={"AuthNavigator"}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="AuthNavigator"
        component={AuthNavigator}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeNavigator"
        component={HomeNavigator}
      />
    </Stack.Navigator>
  );
}
