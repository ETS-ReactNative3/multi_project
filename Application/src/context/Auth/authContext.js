import React,{useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = React.createContext();

const setStorage= async(token)=>{
    await AsyncStorage.setItem('token', token)
}

// const getStorage = async () => {
//     const showToken = await AsyncStorage.getItem('token')
//     if(showToken){
//         return (showToken)
//     }
//     else
// }

const authReducer = async (state,action)=>{
    switch (action.type) {
        case 'login':{
            setStorage(action.payload)
            return {authenticated:action.payload}
            break;
        }
        case 'logout':{
            _storeData = async () => {
                try {
                  await AsyncStorage.removeItem('token');
                } catch (error) {
                  alert(error)
                }
            };
            break;
        }
        case 'setToken':{
            return {authenticated:action.payload}
            break;
        }
        case 'addShopCart':{
            setStorage(action.payload)
            return {authenticated:action.payload}
            break;
        }
        default:
            return state;  
    }
}
const AuthContextProvider=(props)=>{
    const[authenticated,dispatch] = useReducer(authReducer,''); 
    return(
        <AuthContext.Provider value={{authenticated,dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;