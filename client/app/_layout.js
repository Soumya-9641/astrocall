import { Stack } from "expo-router";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// SplashScreen.preventAutoHideAsync();
import { Ionicons } from '@expo/vector-icons';

import AstrologerDetails from "./astrologerDetails";
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};
//const Stack = createStackNavigator();
const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack initialRouteName="home">
    <Stack.Screen name="home" />
    <Stack.Screen 
        name="astrologerDetails" 
        options={{ 
          headerTitle: 'Profile', 
          headerStyle: { backgroundColor: '#FFEA00' },
          headerRight: () => (
            <Ionicons
              name="share-social"
              size={24}
              color="black"
              style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}
              onPress={() => {
                // Add your share functionality here
                console.log("Share icon pressed");
              }}
            />
          ),
        }} 
      />
  </Stack>
  // <NavigationContainer>
  //    <Stack.Navigator initialRouteName="home">
  //       <Stack.Screen
  //         name="home"
  //         component={Home}
  //         options={{ headerTitle: 'Home' }}
  //       />
  //       <Stack.Screen
  //         name="astrologerDetails"
  //         component={AstrologerDetails}
  //         options={{
  //           headerTitle: 'Profile',
  //           headerStyle: { backgroundColor: '#FFEA00' },
  //           headerRight: () => (
  //             <Ionicons
  //               name="share-social"
  //               size={24}
  //               color="black"
  //               style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}
  //               onPress={() => {
  //                 // Add your share functionality here
  //                 console.log("Share icon pressed");
  //               }}
  //             />
  //           ),
  //         }}
  //       />
  //     </Stack.Navigator>
  // </NavigationContainer>
  )
};

export default Layout;