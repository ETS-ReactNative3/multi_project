import React,{useState,useEffect,useContext} from 'react'
import {StyleSheet,View,Text,Dimensions,TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ripple from 'react-native-material-ripple'
import {useNavigation} from 'react-navigation-hooks'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import {BascketContext} from '../../context/Basc/bascketContext'
const w = Dimensions.get('window').width;

const Warranty = (props) => {

    const { navigate } = useNavigation();
    const [border_color,set_border_color]=useState();
    const [data,SETdata]=useState([])
    const [defaultSeller,SETdefaultSeller]=useState([])
    const {bascket,AddToBascket} = useContext(BascketContext)


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
                          attribute {
                            seller {
                                _id,
                                name
                            }
                            warranty {
                                _id,
                                name
                            }
                            color,
                            price,
                            discount,
                            suggestion
                          }
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
                    SETdata(response.data.data.getProduct[0].attribute)
                    SETdefaultSeller(response.data.data.getProduct[0].attribute[0])
                    set_border_color(response.data.data.getProduct[0].attribute[0].color)
                    console.log(response.data.data.getProduct[0].attribute)
                }
              })
              .catch(function (error) {
                console.log(error)
            });
        }

        
        fetchData()
    },[])
    

    const _changeBorderColor=(color,item)=>{
        set_border_color(color)
        SETdefaultSeller(item)
    }

    const _convert_color = (color) => {
        switch (color) {
            case "red":
                return "قرمز"
                break;
            case "green":
                return "سبز"
                break;
            case "blue":
                return "آبی"
                break;
            case "yellow":
                return "زرد"
                break;
            case "black":
                return "سیاه"
                break;
            case "white":
                return "سفید"
                break;        
            default:
                break;
        }
    }

    const _add_to_shop_cart=()=>{
        AddToBascket(data,border_color);
        alert('محصول با موفقیت ثبت شده')
        // navigate('Shop_cart');
    }

    return(
       <View style={styles.container}>
            <View style={styles.sec1}>
                <View style={styles.sec1_part1}>
                    <Text style={[styles.text_size16,]}>
                        {data.length} رنگ
                    </Text>
                    <Text style={[styles.text_size16,styles.text_color_gray]}>
                        رنگ
                    </Text>
                </View>
                <View style={styles.sec1_part2}>
                    {
                        data.map((item,key)=>(
                            <TouchableOpacity 
                                style={[styles.sec1_part2_box,border_color===item.color?{borderColor:'blue'}:{}]} 
                                onPress={()=>_changeBorderColor(item.color,item)}
                            >
                                <View style={[styles.sec1_part2_box_color,{backgroundColor:item.color}]}/>
                                <Text style={[styles.text_size13,styles.text_color_gray]}>
                                    {_convert_color(item.color)}
                                </Text>
                            </TouchableOpacity>
                        )) 
                    }
                    
                </View>
                <View style={styles.sec1_part3}>
                    <Text  style={[styles.text_size14,styles.text_color_gray]}>
                        گارانتی 10 ماهه
                    </Text>
                    <MaterialCommunityIcons name='shield-check' style={[styles.icon_ml,styles.text_color_lightGray]}/>
                </View>
            </View>

            <View style={[styles.sec2,styles.border_top]}>
                    <View style={[styles.sec2_part,{marginBottom:10}]}>
                        <Text style={[styles.text_size14,styles.text_color_gray]}>
                            فروش توسط دی جی کالا | رضایت خرید : 83%
                        </Text>
                        <MaterialCommunityIcons name='store' style={[styles.icon_ml,styles.text_color_gray]}/>
                    </View>
                    <View style={styles.sec2_part}>
                        <Text style={[styles.text_size14,styles.text_color_gray]}>
                            آماده ارسال از انبار دیجی کالا از 1 
                            <Text style={[styles.text_size14,styles.text_color_black]}>
                                1 روز آینده
                            </Text>
                        </Text>
                        <MaterialIcons name='local-shipping' style={[styles.icon_ml,styles.text_color_gray]}/>
                    </View>
            </View>

            <View style={[styles.sec3,styles.border_top]}>
                <View style={styles.sec3_part1}>
                    {
                        defaultSeller.discount?
                            <>
                                <Text style={styles.sec3_text1}>
                                    {defaultSeller.price-(defaultSeller.price*(defaultSeller.discount/100))} تومان
                                </Text>
                                <Text style={styles.sec3_text2}>
                                    {defaultSeller.price} تومان
                                </Text>
                            </>
                        :
                            <Text style={styles.sec3_text1}>
                                {defaultSeller.price} تومان
                            </Text>
                    }
                </View>
                <Ripple style={styles.sec3_btn} onPress={()=>_add_to_shop_cart()}>
                    <Text style={styles.sec3_btn_text}>
                        افزودن به سبد خرید
                    </Text>
                    <MaterialIcons name='add-shopping-cart' color='#fff' style={styles.icon_ml}/>
                </Ripple>
            </View>

            <View style={[styles.sec4,styles.border_top]}>
                <View style={styles.sec4_part}>
                    <MaterialIcons name='keyboard-arrow-left'  style={[styles.icon_ml,styles.text_color_lightGray]}/>
                </View>
                <View style={styles.sec4_part}>
                    <Text style={styles.text_color_blue}>
                        4 فروشنده و گارانتی برای این کالا وجود دارد
                    </Text>
                    <MaterialCommunityIcons name='store' style={[styles.icon_ml,styles.text_color_gray]}/>
                </View>
            </View>
                        
       </View>
    )
}

const styles =StyleSheet.create({
    container:{
        width:null,
        height:null,
        backgroundColor:'#fff',
        padding:10,
        elevation:2,
        marginTop:10
    },
    border_top:{
        borderColor:'#bbb',
        borderTopWidth:0.4
    },
    sec1:{
        paddingBottom:10
    },
    sec1_part1:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    sec1_part2:{
        flexDirection:'row',
        justifyContent:'flex-end',
        flexWrap:'wrap'
    },
    sec1_part2_box:{
        width:w/8,
        height:w/8,
        borderColor:'#888',
        borderWidth:.9,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        marginLeft:10,
        marginRight:0
    },
    sec1_part2_box_color:{
        width:25,
        height:25,
        borderRadius:100,
        borderColor:'#bbb',
        borderWidth:0.5,
    },
    sec1_part3:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        marginRight:10
    },
    sec2:{
        padding:10,
        
    },
    sec2_part:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    sec3:{
        paddingTop:15,
        padding:10,
    },
    sec3_part1:{
        flexDirection:'row'
    },
    sec3_text1:{
        fontSize:19,
        color:'#5ecf56',
        marginBottom:15,
        textAlign:'left',
        marginRight:5,
        fontFamily:'B Nazanin',
    },
    sec3_text2:{
        fontSize:17,
        color:'red',
        textDecorationLine:'line-through',
        textAlign:'left',
        fontFamily:'B Nazanin',
    },
    sec3_btn:{
        width:null,
        height:w/11,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#5ecf56',
        borderRadius:5
    },
    sec3_btn_text:{
        fontSize:15,
        color:'#fff',
        fontWeight:'bold',
        fontFamily:'IRANSansMobile_Light',
    },
    sec4:{
        padding:10,
        paddingBottom:5,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    sec4_part:{
        flexDirection:'row',
        alignItems:'center'
    },

    text_color_black:{
        color:'#000'
    },
    text_color_blue:{
        color:'#57ada6',
        fontFamily:'IRANSansMobile_Light',
    },
    text_color_gray:{
        color:'#666'
    },
    text_color_lightGray:{
        color:'#bbb'
    },
    text_size16:{
        fontSize:14,
        fontFamily:'IRANSansMobile',
    },
    text_size14:{
        fontSize:13,
        fontFamily:'IRANSansMobile_Light',
    },
    text_size13:{
        fontSize:12,
        fontFamily:'IRANSansMobile_Light',
    },
    icon_ml:{
        marginLeft:5,
        fontSize:24
    }
})

export default React.memo(Warranty);