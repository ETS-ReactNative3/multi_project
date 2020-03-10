import React,{useState} from 'react'
import {ToastAndroid} from 'react-native'
import {Content,Container} from 'native-base'
import {useNavigation} from 'react-navigation-hooks'

import My_Header from '../components/header/my_header'
import Shop_box from '../components/cart_page/shop_box'
import My_Footer from '../components/footer/my_footer'
import AsyncStorage from '@react-native-community/async-storage';

let props = {
    head_name:'Cart',
}

const Shop_cart =() => {

    const{ navigate} = useNavigation();
    const [p_id,SETp_id]=useState([])

    _set_product_id=(e)=>{
        SETp_id(e)
    }
    const onLogin = async() => {
       const token =  await AsyncStorage.getItem('token');
       if(token)
       {
        navigate("User_Info")
       }
       else{
        ToastAndroid.showWithGravityAndOffset(
            'برای ثبت سفارش باید وارد حساب کاربری خود شوید!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
       }
       
        
    }

    return(
        <Container style={{backgroundColor:'#f3f3f3',}}>
            <My_Header {...props}/>
            <Content>
                <Shop_box 
                    _set_product_id={()=>_set_product_id()}
                />
            </Content>
            <My_Footer onLogin={onLogin} name="ثبت سفارش"/>
        </Container>
    )
}

export default React.memo(Shop_cart)