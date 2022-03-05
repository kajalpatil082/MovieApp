import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Favorites} from '../Screens/FavoritesListScreen';
import Home from '../Screens/Home';
import ItemData from '../Screens/ItemData';
import HistoryScreen from '../Screens/HistoryScreen';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="API"
          component={Home}
          options={{title: 'Movies And Shows Gallery'}}
        />
        <Stack.Screen
          name="FavoritesListScreen"
          component={Favorites}
          options={{title: 'Your favorite movies'}}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{title: 'Your History'}}
        />
        <Stack.Screen
          name="ItemData"
          options={{title: 'Detail of movie'}}
          component={ItemData}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default HomeStack;
