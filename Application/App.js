import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import AuthContextProvider from './src/context/Auth/authContext'
import {I18nManager} from 'react-native'
I18nManager.allowRTL(false)

console.disableYellowBox= true;

import SideMenu from './src/components/drawer/sideMenu'
import Main from './src/screens/main'
import AboutCategory from './src/screens/about_category'
import Off from './src/screens/off'
import Kala from './src/screens/kala'
import Shop_cart from './src/screens/shop_cart'
import Login from './src/screens/Login'
import SignOn from './src/screens/signOn'
import Forget_Pass from './src/screens/forget_pass'
import Search from './src/screens/search'
import Category from './src/screens/category'
import Comment from './src/screens/comment'
import Add_Comment from './src/screens/add_comment'
import Kala_specification from './src/screens/kala_specification'

const Stack = createStackNavigator({
  Main:Main,
  AboutCategory:AboutCategory,
  Off:Off,
  Kala:Kala,
  Shop_cart:Shop_cart,
  Login:Login,
  SignOn:SignOn,
  Forget_Pass:Forget_Pass,
  Search:Search,
  Category:Category,
  Comment:Comment,
  Add_Comment:Add_Comment,
  Kala_specification:Kala_specification
},{
  initialRouteName:"Main",
  headerMode:'none'  
});


const Drawer = createDrawerNavigator({
    Stack:Stack
},{
  drawerPosition:'right',
  drawerWidth:'60%',
  contentComponent:SideMenu
})

const AppContainer = createAppContainer(Drawer);
const App = ()=>{
  return(
    <AuthContextProvider>
      <AppContainer />
    </AuthContextProvider>
  )
}
export default App;
