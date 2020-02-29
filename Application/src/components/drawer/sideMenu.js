import React from 'react'
import {StyleSheet,Text,View} from 'react-native'
import FIcon from 'react-native-vector-icons/FontAwesome'
import MAIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ripple from 'react-native-material-ripple'
import {useNavigation} from 'react-navigation-hooks'
import AsyncStorage from '@react-native-community/async-storage';

// const getStorage= async()=>{
//     await AsyncStorage.getItem('token');
// }

const SideMenu =()=>{
    const { navigate } = useNavigation();
    return(
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.head_text} onPress={()=>navigate('Login')}>
                    ورود و ثبت نام
                </Text>
                <FIcon name='user' style={styles.icon} />
            </View>
            <View style={styles.body}>
                <Ripple style={styles.body_btn} onPress={()=>navigate('Main')}>
                    <Text style={styles.body_btn_txt}>خانه</Text>
                    <MAIcon name='home' style={styles.body_btn_icon}/>
                </Ripple>
                <Ripple style={styles.body_btn} onPress={()=>navigate('Category')}>
                    <Text style={styles.body_btn_txt}>لیست دسته بندی</Text>
                    <MAIcon name='format-list-bulleted-square' style={[styles.body_btn_icon,{rotation:180}]}/>
                </Ripple>


                <Ripple style={[styles.body_btn,styles.border_t,{justifyContent: 'space-between'}]} onPress={()=>navigate('Shop_cart')}>
                    <View>
                        <Text style={styles.cart_ci}>0</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.body_btn_txt}>سبد خرید</Text>
                        <MAIcon name='cart' style={styles.body_btn_icon}/>
                    </View>
                </Ripple>



                <Ripple style={[styles.body_btn,styles.border_t]} onPress={()=>navigate('Off')}>
                    <Text style={styles.body_btn_txt}>پرفروش ترین ها</Text>
                    <FIcon name='star' style={styles.body_btn_icon}/>
                </Ripple>
                <Ripple style={styles.body_btn} onPress={()=>navigate('Off')}>
                    <Text style={styles.body_btn_txt}>پیشنهاد ویژه دیجی کالا</Text>
                    <FIcon name='star' style={styles.body_btn_icon}/>
                </Ripple>
                <Ripple style={styles.body_btn} onPress={()=>navigate('Off')}>
                    <Text style={styles.body_btn_txt}>پربازدید ترین ها</Text>
                    <FIcon name='star' style={styles.body_btn_icon}/>
                </Ripple>
                <Ripple style={styles.body_btn} onPress={()=>navigate('Off')}>
                    <Text style={styles.body_btn_txt}>جدیدتربن ها</Text>
                    <FIcon name='star' style={styles.body_btn_icon}/>
                </Ripple>
                <Ripple style={[styles.body_btn,styles.border_t]} onPress={()=>navigate('Main')}>
                    <Text style={styles.body_btn_txt}>تنظیمات</Text>
                    <MAIcon name='settings' style={styles.body_btn_icon}/>
                </Ripple>
                <Ripple style={styles.body_btn} onPress={()=>navigate('Main')}>
                    <Text style={styles.body_btn_txt}>سوالات متداول</Text>
                    <FIcon name='question-circle-o' style={styles.body_btn_icon}/>
                </Ripple>
                <Ripple style={styles.body_btn} onPress={()=>navigate('Main')}>
                    <Text style={styles.body_btn_txt}>درباره ما</Text>
                    <MAIcon name='clipboard-alert' style={styles.body_btn_icon}/>
                </Ripple>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    head:{
        width:'100%',
        height:'10%',
        backgroundColor:'#ef394e',
        paddingRight:15,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        paddingBottom:17
    },
    body:{
        width:'100%',
        height:'90%',
    },
    head_text:{
        fontSize:13,
        color:'#fff',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5,
        padding:2,
        fontFamily:'IRANSansMobile'
    },
    icon:{
        color:'#fff',
        fontSize:18,
        padding:5,
        paddingLeft:10
    },
    body_btn:{
        width:'100%',
        height:null,
        padding:13,
        paddingRight:15,
        paddingTop:11,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    body_btn_txt:{
        fontSize:13,
        color:'#111',
        marginRight:17, 
        fontFamily:'IRANSansMobile_Light'
    },
    body_btn_icon:{
        fontSize:20,
        color:'#666'
    },
    border_t:{
        borderTopWidth:0.4,
        borderColor:'#555'
    },
    cart_ci:{
        padding:2,
        paddingRight:10,
        paddingLeft:10,
        backgroundColor:'#aaa',
        borderRadius:100,
        fontSize:15,
        fontFamily:'B Nazanin',
    }
})

export default React.memo(SideMenu);