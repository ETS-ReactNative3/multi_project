import React,{useState,useEffect} from 'react'
import {StyleSheet,View,Image,Text,Dimensions,ScrollView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import My_Header from '../components/header/my_header'
import Slider from '../components/kala_page/slider'
import Sharee from '../components/kala_page/share'
import Buttons from '../components/kala_page/buttons'
import Warranty from '../components/kala_page/warrranty'
import Disc from '../components/kala_page/disc'
import Rating from '../components/kala_page/rating'
import Cat from '../components/kala_page/cat'
import Pro_similar from '../components/kala_page/pro_similar'
import Pro_other_by from '../components/kala_page/pro_other_by'
import {useNavigation} from 'react-navigation-hooks'
import { Item } from 'native-base';


const Kala = () => {

    const {getParam}=useNavigation();
    const head_name = getParam('header_name')
    const id = getParam('item_id')
    const [token,SETtoken]=useState();
    

    let props = {
        head_name:'Main',
        head_page_name:head_name,
        right_btn:'back'
    }

    return(
        <ScrollView style={{backgroundColor:'#eee'}}>
            <My_Header {...props}/>
            <Slider item_id={id}/>
            <Sharee item_id={id}/>
            <View style={{marginLeft:20,marginRight:20}}>
                <Buttons item_id={id} head_name={head_name}/>
                <Warranty item_id={id}/>
                <Disc item_id={id}/>
                {/* <Rating item_id={id}/> */}
            </View>
            <Cat item_id={id}/>
            <Pro_similar item_id={id}/>
            <Pro_other_by item_id={id}/>
        </ScrollView>
    )
}

export default React.memo(Kala);