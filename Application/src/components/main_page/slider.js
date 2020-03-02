import React ,{useEffect, useState}from 'react'
import {View,TouchableWithoutFeedback,Image,StyleSheet,Dimensions} from 'react-native'
import Swiper from 'react-native-swiper'
import {swiper_list} from '../../data/dataArray'
import axios from 'axios'

const w = Dimensions.get('window').width;
const Slider = () => {

    const [data,SETdata]=useState([])

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
                                    name
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
                // alert(JSON.stringify(response.data.data.MainPageApp.slider.image))
            }
            })
            .catch(function (error) {
            alert('er'+error)
        });
    },[])


    return(
        <View style={styles.container}>
            {/* <Swiper autoplay={true}>
                {
                    data.map((item,key)=>(
                        <View style={styles.btn} key={key}>
                        {console.log(item.dir)
                            <Image 
                                style={styles.img}
                                source={require('shop/api/public/uploads/2020/2/1000020017.jpg')}
                            />
                        </View>
                    ))
                }
            </Swiper> */}
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