import React,{useContext,useEffect,useState} from 'react'
import {View,Text,Image,StyleSheet,Picker,Alert,TextInput} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import {BascketContext} from '../../context/Basc/bascketContext'
// import {cart} from '../../data/dataArray'

const Shop_box =(props) => {

    const { bascket,removeBascket } = useContext(BascketContext);

    _alert=(key)=>{
        removeBascket(key)
    }

    let sum = 0;

    return(
        <View style={styles.container}>
            {
                bascket.length>0?
                    (
                        <>
                            {
                                bascket.map((item,key)=>{
                                    const itemPrice = item.price*item.count-(item.price*item.count*(item.discount/100));
                                    sum+=itemPrice;

                                    const arr_p_id = [];
                                    arr_p_id.push([item.productId]);
                                    props._set_product_id(arr_p_id)
                                    return(
                                        <View style={styles.content} key={item.productId}>
                                            <View style={styles.sec1}>
                                                <View style={styles.sec1_left}>
                                                    <Text style={[styles.h3,styles.text_right]}>
                                                        {item.productName}
                                                    </Text>
                                                    <Text style={[styles.h4_lightGray,styles.text_right]}>
                                                        {item.productEName}
                                                    </Text>
                                                    <View style={styles.flex_di_row}>
                                                        <View style={[styles.border_color,{backgroundColor:item.color}]}/>
                                                        <Text style={[styles.h4_lightGray,styles.text_right]}>{item.color}</Text>
                                                        <Text style={[styles.h4_darkGray,styles.text_right]}>رنگ:</Text>                            
                                                    </View>
                                                    <View style={styles.flex_di_row}>
                                                        <Text style={[styles.h4_lightGray,styles.text_right]}>گرانتی {item.warrantyName} </Text>
                                                        <Text style={[styles.h4_darkGray,styles.text_right]}>گارانتی:</Text>
                                                    </View>
                                                    <View style={styles.flex_di_row}>
                                                        <Text style={[styles.h4_lightGray,styles.text_right]}>{item.sellerName}</Text>
                                                        <Text style={[styles.h4_darkGray,styles.text_right]}>فروشنده:</Text>
                                                    </View>
                                                    <View style={styles.flex_di_row}>
                                                        <TextInput 
                                                            keyboardType={"numeric"}
                                                            defaultValue={"1"}
                                                            value={item.count}
                                                            style={{borderColor:'#ccc',borderWidth:1,borderRadius:5,width:40,height:40,textAlign:'center'}}
                                                        />
                                                        <Text style={[styles.h4_darkGray,styles.text_right]}>تعداد :</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.sec1_right}>
                                                    <Image 
                                                        style={styles.sec1_right_img}
                                                        source={{uri:'https://digikala.liara.run'+item.productImage}}
                                                    />
                                                </View> 
                                            </View>

                                            <View style={[styles.sec2,styles.border_top]}>
                                                <Text style={styles.h4_lightGrayPrice}>
                                                    {itemPrice} تومان
                                                </Text>
                                                <Text style={styles.h4_lightGrayPrice}>قیمت کل</Text>
                                            </View>

                                            <View style={[styles.sec4,styles.border_top]}>
                                                <Text style={styles.delete} onPress={()=>_alert(key)}>
                                                    حذف
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            <View style={[styles.sec3]}>
                                <Text style={styles.text}>اعمال کد تخفیف</Text>
                                <TextInput 
                                    style={styles.textIn}
                                    // onChangeText={(e)=>props.usernegetiveHandler(e)}
                                    // value={props.negetive}
                                />
                            </View>
                            <View style={[styles.sec3]}>
                                <Text style={styles.h3_green}>
                                    {sum} تومان
                                </Text>
                                <Text style={styles.h3_green}>قیمت نهایی</Text>
                            </View>
                        </>
                    )
                :
                    <Text>
                        سبد خرید شماخالی است
                    </Text>
                
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
        height:400,
        backgroundColor:'#fff',
        elevation:2,
        marginBottom:10
    },
    sec1:{
        height:'80%',
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
        height:50,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor:'#fff',
        paddingRight:15,
        paddingLeft:15,
        alignItems:"center",
        borderWidth:0.4,
        borderColor:'#f4f4f4'
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
    textIn:{
        width:'70%',
        backgroundColor:'#eee',
        fontSize:15,
        color:'#666',
        height:40,
        textAlign:'right',
    },
    text:{
        width:'30%',
        padding:5,
        marginRight:5,
        backgroundColor:'green',
        borderRadius:4,
        fontSize:16,
        color:'#f1f1f1',
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