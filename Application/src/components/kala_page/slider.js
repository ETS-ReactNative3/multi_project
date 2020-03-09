import React,{useState,useEffect,useContext} from 'react'
import {Text,StyleSheet,View,Dimensions,Image} from 'react-native'
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import {BascketContext} from '../../context/Basc/bascketContext'

const w = Dimensions.get('window').width;

const Slider = (props) => {

    const [data,SETdata]=useState([])
    const {_set_product_image}=useContext(BascketContext);

    useEffect(()=>{
        async function fetchData() {
            axios({
                url: '/',
                method: 'post',
                // headers:{'token':`${await AsyncStorage.getItem('token')}`},
                data: {
                    query: `
                    query getProduct($page : Int, $limit : Int, $productId : ID, $categoryId : ID) {
                        getProduct(page : $page, limit : $limit, productId : $productId, categoryId : $categoryId){
                        _id,
                        original
                        }
                      }
                    `, 
                    variables : {
                        "page": 1,
                        "limit": 10,
                        "productId": props.item_id,
                        "categoryId" : null
                    }
                }
                })
              .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    SETdata(response.data.data.getProduct)
                    _set_product_image(response.data.data.getProduct[0].original)
                    // alert(JSON.stringify(response.data.data.getProduct))
                }
              })
              .catch(function (error) {
                console.log(error)
            });
        }

        
        fetchData()
    },[])


    return(
        <View style={styles.container}>
            <Swiper>
                {
                    data.map((item,key)=>(
                        <View style={styles.box}>
                            <Image 
                                source={{uri:'https://digikala.liara.run'+item.original}}
                                style={styles.img}
                            />
                        </View>
                    ))
                }
            </Swiper>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        width:w,
        height:w/1.5
    },
    img:{
        width:'100%',
        height:'100%',
    }
})

export default React.memo(Slider);