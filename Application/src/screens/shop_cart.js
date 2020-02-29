import React from 'react'
import {ScrollView} from 'react-native'

import My_Header from '../components/header/my_header'
import Shop_box from '../components/cart_page/shop_box'


let props = {
    head_name:'Cart',
}

const Shop_cart =() => {
    return(
        <ScrollView style={{backgroundColor:'#f3f3f3',}}>
            <My_Header {...props}/>
            <Shop_box />
        </ScrollView>
    )
}

export default React.memo(Shop_cart)