/**
 * @format
 */
import axios from 'axios'
axios.defaults.baseURL="https://digikala.liara.run/graphql";
axios.defaults.headers.post['Accept']='application/json';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AuthContextProvider from './src/context/Auth/authContext'

AppRegistry.registerComponent(appName, () => App);
