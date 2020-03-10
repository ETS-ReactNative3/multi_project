import React ,{useEffect, useState}from 'react'
import {View,TouchableWithoutFeedback,Image,StyleSheet,Dimensions} from 'react-native'
import Swiper from 'react-native-swiper'
import {swiper_list} from '../../data/dataArray'
import axios from 'axios'

import Loader from '../common/loader'
const w = Dimensions.get('window').width;

const Slider = () => {

    const [data,SETdata]=useState([])
    const [loading,SETloading]=useState(true)

    useEffect(()=>{
        axios({
            url: '/',
            method: 'post',
            data: {
                query: `
                    query MainPageApp {
                        MainPageApp {
                            slider {
                                image {
                                    _id,
                                    dir
                            }
                            },
                        
                        }
                    }
                ` 
            }
            })
            .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    SETdata(response.data.data.MainPageApp.slider.image)
                    SETloading(false)
                }
            })
            .catch(function (error) {
            alert('er'+error)
        });
    },[])


    return(
        loading?
            <Loader/>
        :
            <View style={styles.container}>
                {/* <Swiper>
                    {
                        data.map((item,key)=>(
                            <View style={styles.btn} key={key}>
                                <Image 
                                    style={styles.img}
                                    source={{uri:'https://digikala.liara.run'+item.dir}}
                                />
                            </View>
                        ))
                    }
                </Swiper> */}
                <View style={styles.btn}>
                  <Image 
                                    style={styles.img}
                                    source={{uri:'https://digikala.liara.run'+data[0].dir}}
                                />
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:w/2.2
    },
    btn:{
        flex:1
    },
    img:{
        width:'100%',
        height:'100%'
    }
})

export default React.memo(Slider);