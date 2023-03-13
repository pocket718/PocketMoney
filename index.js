/**
 * @format
 */




import { AppRegistry ,TouchableOpacity ,StyleSheet } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux' ;
import store from './src/redux/store';
import 'react-native-gesture-handler';

const RootApp = () =>{
return(
    <Provider store={store}>
    <App />
    </Provider>
)
}

AppRegistry.registerComponent(appName, () => RootApp);

