import React,{useState,useEffect} from 'react'
import {ScrollView} from 'react-native'
import {useNavigation} from 'react-navigation-hooks'


import My_Header from '../components/header/my_header'
import Cat from '../components/about_category_page/cat'
import KalaOne from '../components/about_category_page/kala1'
import KalaTwo from '../components/about_category_page/kala2'
import KalaThree from '../components/about_category_page/kala3'


const AboutCategory = () => {

    const{getParam}=useNavigation();
    const id = getParam('id')

    let props={
        head_name:'Main',
        head_page_name:getParam('header_name'),
    }

    return(
        <ScrollView style={{backgroundColor:'#f3f3f3',}}>
            <My_Header {...props}/>
            <Cat item_id={id}/>
            <KalaOne />
            <KalaTwo />
        </ScrollView>
    )
}

export default React.memo(AboutCategory);