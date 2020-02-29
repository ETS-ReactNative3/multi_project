/**
 * @format
 */
import axios from 'axios'
axios.defaults.baseURL="http://192.168.0.106:4000/graphql";
axios.defaults.headers.post['Accept']='application/json';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AuthContextProvider from './src/context/Auth/authContext'

AppRegistry.registerComponent(appName, () => App);
