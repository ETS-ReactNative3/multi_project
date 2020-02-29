import React from 'react'
import {ScrollView} from 'react-native'
import {useNavigation} from 'react-navigation-hooks'

import Offs from '../components/off_page/offs'
import My_Header from '../components/header/my_header'


const Off =() => {

    const {getParam}=useNavigation();
    const id = getParam('id');
    const name = getParam('header_name')
    
    let props = {
        head_name:'Main',
        head_page_name:name,
        right_btn:'back'
    }

    return(
        <ScrollView style={{backgroundColor:'#f3f3f3',}}>
            <My_Header {...props}/>
            <Offs kala_id={id}/>
        </ScrollView>
    )
}

export default React.memo(Off)