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

    const [s_slider,Sets_slider]=useState([])
    const [s_fname,Sets_fname]=useState([])
    const [s_ename,Sets_ename]=useState([])
    const [s_btn,Sets_btn]=useState([])
    const [s_warenty,Sets_warenty]=useState([])
    const [s_disc,Sets_disc]=useState([])
    const [s_rating,Sets_rating]=useState([])

    const {getParam}=useNavigation();
    const head_name = getParam('header_name')
    // const id = getParam('item_id')
    const id = "5e4e2dd63fbf17251474119a"
    
    let props = {
        head_name:'Main',
        head_page_name:'header_name',
        right_btn:'back'
    }


    useEffect(()=>{
        async function fetchData() {
            axios({
                url: '/',
                method: 'post',
                headers:{'token':`${await AsyncStorage.getItem('token')}`},
                data: {
                    query: `
                    query getProduct($page : Int, $limit : Int, $productId : ID, $categoryId : ID) {
                        getProduct(page : $page, limit : $limit, productId : $productId, categoryId : $categoryId){
                        _id,
                        fname,
                        ename,
                        category {
                            name
                            parent {
                              name
                            }
                        }
                        brand {
                            name
                        }
                        attribute {
                            seller {
                              name
                            }
                            warranty {
                              name
                            }
                            color,
                            price,
                            suggestion
                        }
                        description
                        rate
                        details {
                            p_details {
                              name
                              specs {
                                specs
                                label
                              }
                            }
                            value
                            label
                        }
                        image
                        }
                      }
                    `, 
                    variables : {
                        "page": 1,
                        "limit": 10,
                        "productId": "5e4e2dd63fbf17251474119a",
                        "categoryId" : null
                    }
                }
                })
              .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    Sets_warenty(response.data.data.getProduct[0].attribute)
                    Sets_slider(response.data.data.getProduct[0].image[0])
                    Sets_fname(response.data.data.getProduct[0].fname)
                    Sets_ename(response.data.data.getProduct[0].ename)
                    // Sets_btn(response.data.data.getProduct[0].details)
                    Sets_disc(response.data.data.getProduct[0].description)
                }
              })
              .catch(function (error) {
                console.log(error)
            });
        }

        
        fetchData()
    },[])


    return(
       <ScrollView style={{backgroundColor:'#eee'}}>
            <My_Header {...props}/>
            <Slider item_id={id}/>
            <Sharee item_id={id}/>
            <View style={{marginLeft:20,marginRight:20}}>
                <Buttons item_id={id}/>
                <Warranty item_id={id}/>
                <Disc item_id={id}/>
                <Rating item_id={id}/>
            </View>
            <Cat item_id={id}/>
            <Pro_similar item_id={id}/>
            <Pro_other_by item_id={id}/>
       </ScrollView>
    )
}

export default React.memo(Kala);