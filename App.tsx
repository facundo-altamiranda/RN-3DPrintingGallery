import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {StackParamList} from 'types';
import CameraScreen from 'screens/CameraScreen';
import GalleryScreen from 'screens/GalleryScreen';
import PhotoReviewScreen from 'screens/PhotoReviewScreen';

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          statusBarStyle: 'dark',
          animationTypeForReplace: 'push',
        }}
        initialRouteName="GalleryScreen">
        <Stack.Group>
          <Stack.Screen
            name="GalleryScreen"
            component={GalleryScreen}
            options={{
              title: 'Gallery',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{headerShown: false}}
          />
        </Stack.Group>

        <Stack.Group
          screenOptions={{presentation: 'modal', headerShown: false}}>
          <Stack.Screen
            name="PhotoReviewScreen"
            component={PhotoReviewScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
