import 'react-native-gesture-handler';
import React from 'react';
import './config/ReactotronConfig';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import Home from './pages/Home';
import colors from './utils/colors';
import store from './store';

const App: React.FC = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.grey,
      paddingTop: RFValue(20),
    }}
  >
    <StatusBar barStyle="dark-content" />
    <Provider store={store}>
      <Home />
    </Provider>
  </View>
);

export default App;
