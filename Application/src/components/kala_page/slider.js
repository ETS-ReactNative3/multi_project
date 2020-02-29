import React from 'react'
import {Text,StyleSheet,View,Dimensions,Image} from 'react-native'
import Swiper from 'react-native-swiper'
import {kala} from '../../data/dataArray'

const w = Dimensions.get('window').width;

const Slider = (props) => {
    return(
        <View style={styles.container}>
            <Swiper>
                {
                    kala.map((item,key)=>(
                        <View style={styles.box}>
                            <Image 
                                source={{uri:item.img}}
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