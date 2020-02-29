import AsyncStorage from '@react-native-community/async-storage';

export let GetToken = async () =>{
    const token = await AsyncStorage.getItem('token')
    if (token != null){
        return token
    }else{
        return false
    }
}
