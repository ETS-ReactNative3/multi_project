import React,{useEffect,useContext} from 'react'
import {ScrollView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from '../context/Auth/authContext'
import My_Header from '../components/header/my_header'
import Slider from '../components/main_page/slider'
import Cat from '../components/main_page/cat'
import Offer from '../components/main_page/offer'
import Off from '../components/main_page/off'
import KalaOne from '../components/main_page/kala1'
import KalaTwo from '../components/main_page/kala2'
import Amazing_Auggestion from '../components/main_page/amazing_suggestion'

const Main = (props) => {
    
    // const { authenticated,dispatch } = useContext(AuthContext);
    // useEffect(async()=>{
    //     const token = await AsyncStorage.getItem('token');
    //     dispatch({type:'setToken',payload:token});
    //     alert(JSON.stringify(authenticated))
    // },[])


    return(
        <ScrollView style={{backgroundColor:'#f2f3f4'}}>
            <My_Header head_name={'Main'}/>
            <Slider />
            <Cat />
            <Amazing_Auggestion />
            {/* <Off /> */}
            <Offer />
            {/* <Off /> */}
            <KalaOne />
            <KalaTwo />
        </ScrollView>
    )
}

export default React.memo(Main);