/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ListContactScreen from './src/screens/list_contact';
import MainScreen from './src/screens/main';
import AddContactScreen from './src/screens/entry_contact/add_contact';
import { ADD_CONTACT_ROUTE, DETAIL_CONTACT_ROUTE, EDIT_CONTACT_ROUTE } from './src/utils/route';
import DetailContactScreen from './src/screens/detail_contact';
import EditContactScreen from './src/screens/entry_contact/edit_contact';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';

const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name={ADD_CONTACT_ROUTE} component={AddContactScreen} options={{title: 'Add Contact'}}/>
        <Stack.Screen name={EDIT_CONTACT_ROUTE} component={EditContactScreen} options={{title: 'Edit Contact'}}/>
        <Stack.Screen name={DETAIL_CONTACT_ROUTE} component={DetailContactScreen} options={{title: 'Detail Contact'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

// import type {PropsWithChildren} from 'react';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;


// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
