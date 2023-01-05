import React from 'react';
import '../config/ReactotronConfig';
import { LogBox, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeviceInfo from 'react-native-device-info';
import { RFValue } from 'react-native-responsive-fontsize';
import Home from '@app/pages/Home';
import TabBarItem from './TabBarItem';

const Tab = createBottomTabNavigator();

const AppStackRoutes: React.FC = () => {
  LogBox.ignoreAllLogs();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#ccc',
        style: {
          shadowColor: 'rgba(255,255,255,0.4)',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 4.25,
          shadowRadius: 10.84,
          elevation: Platform.OS === 'ios' ? 25 : 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingBottom: RFValue(50),
          height: RFValue(Platform.OS === 'ios' ? 80 : 55),
          alignItems: 'stretch',
          justifyContent: 'space-between',
        },
        labelStyle: {
          marginBottom: DeviceInfo.hasNotch() ? -20 : RFValue(12),
        },
      }}
    >
      <Tab.Screen
        name="Add"
        component={Home}
        options={({ route }) => ({
          tabBarLabel: '',
          tabBarButton: props => <TabBarItem onPress={props.onPress} />,
        })}
      />
    </Tab.Navigator>
  );
  // return (
  //   <App.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //       cardStyle: {
  //         backgroundColor: colors.g,
  //         paddingTop: RFValue(DeviceInfo.hasNotch() ? 40 : 20),
  //       },
  //       cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  //     }}
  //   >
  //     <App.Screen name="Home" component={Home} />
  //   </App.Navigator>
  // );
};

export default AppStackRoutes;
