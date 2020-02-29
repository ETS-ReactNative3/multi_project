import React,{useState,useEffect} from 'react'
import {Text,StyleSheet,View,Dimensions,Image} from 'react-native'
import Stars from 'react-native-stars'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import Rait_sq from '../common/rait_sq'

const w = Dimensions.get('window').width;

const Rating = () => {

    const [data,SETdata]=useState([])

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
                        rate
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
                    SETdata(response.data.data.getProduct[0].description)
                    console.log(response.data.data.getProduct[0].description)
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

            <View style={styles.sec1}>
                <Stars
                    half={true}
                    default={2.5}
                    // update={(val)=>{this.setState({stars: val})}}
                    spacing={4}
                    starSizeW={20}
                    starSizeH={20}
                    count={5}
                    fullStar={require('../../assets/img/full_star.png')}
                    emptyStar={require('../../assets/img/empty_star.png')}
                    halfStar={require('../../assets/img/half_star.png')}
                />
                <Text style={styles.text_size13}>
                    4.3 از 5
                </Text>
                <Text style={[styles.text_size11,styles.text_color_lightGray]}>
                    از مجموع 1456 رای ثبت شده
                </Text>
            </View>
            
            <View style={{width:'80%'}}>
                <Rait_sq />
            </View>

        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        width:null,
        height:null,
        marginTop:10,
        elevation:2,
        padding:5,
        backgroundColor:'#fff'
    },
    sec1:{
        paddingTop:35,
        paddingBottom:35,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    sec2:{
        paddingTop:5,
        paddingBottom:10
    },
    sec2_part:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom: 8
    },
    text_size13:{
        fontSize:17,
        color:'#333',
        marginLeft:5,
        fontFamily:'B Nazanin',
    },
    text_size11:{
        fontSize:10,
        marginLeft:5,
        fontFamily:'IRANSansMobile_Light',
    },
    text_color_lightGray:{
        color:'#bbb'
    },
    text_color_gray:{
        color:'#888'
    }
})

export default React.memo(Rating);