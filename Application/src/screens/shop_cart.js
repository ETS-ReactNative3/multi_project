import React,{useState} from 'react'
import {ScrollView} from 'react-native'
import {Content,Container} from 'native-base'
import {useNavigation} from 'react-navigation-hooks'

import My_Header from '../components/header/my_header'
import Shop_box from '../components/cart_page/shop_box'
import My_Footer from '../components/footer/my_footer'


let props = {
    head_name:'Cart',
}

const Shop_cart =() => {

    const{ navigate} = useNavigation();
    const [p_id,SETp_id]=useState([])

    _set_product_id=(e)=>{
        SETp_id(e)
    }
    alert(JSON.stringify(p_id))
    const onLogin =() => {
        navigate("User_Info")
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