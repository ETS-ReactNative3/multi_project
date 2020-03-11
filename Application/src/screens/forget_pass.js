import React from 'react'
import {View} from 'react-native'

import My_Header from '../components/header/my_header'
import Content from '../components/forget_pass_page/content'

let props ={
    head_name:'ForrgetPass',
    head_page_name:'تایید شماره تلفن همراه'
}

const Forget_Pass =() => {
    return(
        <View style={{backgroundColor:'#f3f3f3',}}>
            <My_Header {...props} />
            <Content />
        </View>
    )
}

export default React.memo(Forget_Pass)