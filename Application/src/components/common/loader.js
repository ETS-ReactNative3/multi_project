import React,{useEffect,useState} from 'react'
import {View} from 'react-native'
import { Content, Spinner } from 'native-base';


const Loader =() => {
    return(
        <Content>
            <Spinner color="gray" />
        </Content>
    )
}

export default React.memo(Loader)