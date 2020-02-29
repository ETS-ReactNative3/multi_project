import React,{useEffect,useState} from 'react'
import {View} from 'react-native'
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import {useNavigation} from 'react-navigation-hooks'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

import My_Header from '../components/header/my_header'
import Content from '../components/category_page/content'
import {cat_list} from '../data/dataArray'

const Category =() => {

    const {getParam}=useNavigation();
    const [data,setData]=useState([])


    useEffect(()=>{
        async function fetchData() {
            axios({
                url: '/',
                method: 'post',
                headers:{'token':`${await AsyncStorage.getItem('token')}`},
                data: {
                    query: `
                        query getAllCategory($page : Int, $limit : Int, $mainCategory : Boolean, $parentCategory : Boolean, $catId : ID) {
                            getAllCategory(input : {page : $page, limit : $limit, mainCategory : $mainCategory, parentCategory : $parentCategory, catId : $catId}) {
                            _id,
                            name,
                            label,
                            parent {
                                name
                            }
                            }
                        }
                    `, 
                    variables : {
                        "page": 1,
                        "limit": 10,
                        "mainCategory": true,
                        "parentCategory": false,
                        "catId": null
                    }
                }
                })
              .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                  setData(response.data.data.getAllCategory)
                //   console.log(response.data.data.getAllCategory)
                }
              })
              .catch(function (error) {
                // alert('مشکل در ارتبا با سرور');
                alert(JSON.stringify(error))
            });
        }


        fetchData()
    },[])


    return(
        <Container>
            <My_Header head_name={'Cat'}/>
            <Tabs initialPage={getParam('num_tab')} renderTabBar={()=> <ScrollableTab style={{backgroundColor:'#EF394E'}}/>}>
                {
                    data.map((item,key)=>(
                        <Tab 
                            heading={item.name}
                            key={item._id}
                            tabStyle={{backgroundColor:'#EF394E'}}
                            activeTabStyle={{backgroundColor:'#EF394E'}}
                            textStyle={{color:'#fafafa',fontFamily:'IRANSansMobile',fontSize:14}}
                            activeTextStyle={{color:'#fff',fontFamily:'IRANSansMobile',fontSize:14}}
                        >
                            <Content id={item._id} />
                        </Tab>
                    ))
                }
            </Tabs>
        </Container>
    )
}

export default React.memo(Category)