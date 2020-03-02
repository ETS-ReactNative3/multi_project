import React,{useContext,useEffect} from 'react'
import {View,Text,Image,StyleSheet,Picker,Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from '../../context/Auth/authContext'
import {cart} from '../../data/dataArray'

const Shop_box =() => {

    const { authenticated } = useContext(AuthContext);
    

    useEffect(()=>{
        async function fetchData() {
            await AsyncStorage.getItem('shopCartData')
            alert(JSON.stringify(await AsyncStorage.getItem('shopCartData')))
        }
    })

    _alert=()=>{
        alert(
            'آیا مایل به حذف این محصول از سبد خرید هستید؟',
            [
              {
                text: 'خیر',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'بله', onPress: () => console.log('OK Pressed')},
            ],
          );
    }

    return(
        <View style={styles.container}>
            {
                cart.map((item,key)=>(
                    <View style={styles.content} key={key}>
                        <View style={styles.sec1}>
                            <View style={styles.sec1_left}>
                                <Text style={[styles.h3,styles.text_right]}>
                                    {item.e_name}
                                </Text>
                                <Text style={[styles.h4_lightGray,styles.text_right]}>
                                    {item.p_name}
                                </Text>
                                <View style={styles.flex_di_row}>
                                    <View style={[styles.border_color,{backgroundColor:item.color_rgb}]}/>
                                    <Text style={[styles.h4_lightGray,styles.text_right]}>{item.color_text}</Text>
                                    <Text style={[styles.h4_darkGray,styles.text_right]}>رنگ:</Text>                            
                                </View>
                                <View style={styles.flex_di_row}>
                                    <Text style={[styles.h4_lightGray,styles.text_right]}>گرانتی {item.warranty} </Text>
                                    <Text style={[styles.h4_darkGray,styles.text_right]}>گارانتی:</Text>
                                </View>
                                <View style={styles.flex_di_row}>
                                    <Text style={[styles.h4_lightGray,styles.text_right]}>{item.seler}</Text>
                                    <Text style={[styles.h4_darkGray,styles.text_right]}>فروشنده:</Text>
                                </View>
                                <View style={styles.flex_di_row}>
                                    <Picker style={{height: 15, width: 30}} mode='dropdown' >
                                        <Picker.Item label={item.number} value={item.number} />
                                    </Picker>
                                    <Text style={[styles.h4_darkGray,styles.text_right]}>تعداد:</Text>
                                </View>
                            </View>
                            <View style={styles.sec1_right}>
                                <Image 
                                    style={styles.sec1_right_img}
                                    source={{uri:item.img}}
                                />
                            </View>
                        </View>

                        <View style={[styles.sec2,styles.border_top]}>
                            <Text style={styles.h4_lightGrayPrice}>
                                {item.price} تومان
                            </Text>
                            <Text style={styles.h4_lightGrayPrice}>قیمت کل</Text>
                        </View>

                        <View style={[styles.sec3,styles.border_top]}>
                            <Text style={styles.h3_green}>
                                {item.end_price} تومان
                            </Text>
                            <Text style={styles.h3_green}>قیمت نهایی</Text>
                        </View>

                        <View style={[styles.sec4,styles.border_top]}>
                            <Text style={styles.delete} onPress={()=>_alert()}>
                                حذف
                            </Text>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        padding:10
    },
    content:{
        width:null,
        height:450,
        backgroundColor:'#fff',
        elevation:2,
        marginBottom:10
    },
    sec1:{
        height:'70%',
        flexDirection:'row',
    },
    sec1_left:{
        width:'75%',
        height:'100%',
        margin:15,
        marginRight:0
    },
    sec1_right:{
        width:'25%',
        height:'100%',
        alignItems:'center'
    },
    sec1_right_img:{
        width:'60%',
        height:'40%',
        margin:15,
        resizeMode:'contain'
    },
    sec2:{
        height:'10%',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#f9f9f9',
        alignItems:'flex-start',
        paddingRight:15,
        paddingLeft:15,
        paddingTop:5
    },
    sec3:{
        height:'10%',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#f9f9f9',
        paddingRight:15,
        paddingLeft:15,
        alignItems:"center"
    },
    sec4:{
        height:'10%',
        padding:5,
        paddingLeft:15,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    delete:{
        color:'red',
        fontSize:14,
        padding:10,
        fontFamily:'IRANSansMobile_Light',
    },






    text_right:{
        textAlign:'right',
        fontFamily:'IRANSansMobile',
    },
    text_left:{
        textAlign:'left'
    },
    h3:{
        fontSize:14,
        color:'#111',
        paddingBottom:5
    },
    h4_lightGray:{
        fontSize:12,
        color:'#aaa',
        fontFamily:'IRANSansMobile_Light',
    },
    h4_lightGrayPrice:{
        fontSize:18,
        color:'#aaa',
        fontFamily:'B Nazanin',
    },
    h4_darkGray:{
        fontSize:12,
        color:'#555',
        paddingLeft:5,
        fontFamily:'IRANSansMobile_Light',
    },
    h3_green:{
        color:'green',
        fontSize:18,
        fontFamily:'B Nazanin',
    },
    flex_di_row:{
        flexDirection:'row',
        paddingTop:10,
        paddingBottom:10,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    border_color:{
        width:15,
        height:15,
        borderRadius:100,
        marginRight:5,
        borderWidth:0.4,
        borderColor:'#ccc'
    },
    border_top:{
        borderTopWidth:0.4,
        borderColor:'#bbb'
    }
})

export default React.memo(Shop_box)