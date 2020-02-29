import React,{useState} from 'react'
import {Text,StyleSheet,View,Dimensions,TouchableOpacity,UIManager,LayoutAnimation} from 'react-native'
import Stars from 'react-native-stars'
import Rait_sq from '../common/rait_sq'
import FIcon from 'react-native-vector-icons/Foundation'

const w = Dimensions.get('window').width;

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

let animate = { 
    duration: 500, 
    create: { type: 'linear', property: 'opacity' }, 
    update: { type: 'spring', springDamping: 10 }, 
    delete: { type: 'linear', property: 'opacity' } 
}


const People_Comment = () => {
    const [change_height,set_change_height]=useState(true);
    const [change_text,set_change_text]=useState('ادامه مطلب');

    const _Change_height_size=()=>{
        LayoutAnimation.configureNext(animate);
        set_change_height(!change_height)
        change_height?set_change_text('بستن'):set_change_text('ادامه مطلب');
    }


    return(
        <View style={styles.container}>

            <View style={styles.sec1}>
                <View style={styles.sec1_left}>
                    <View style={styles.box_like}>
                        <Text>1</Text>
                        <FIcon name='dislike' style={styles.icongray}/>
                    </View>
                    <View style={styles.box_like} >
                        <Text>2</Text>
                        <FIcon name='like' style={styles.icongray}/>
                    </View>
                </View>

                <View style={styles.sec1_right}>
                    <Text style={styles.texth3}>
                        رامین شیخ پور
                    </Text>
                    <Text style={styles.texth5}>
                         6 آذر 1398
                    </Text>
                </View>
            </View>


            <View style={styles.sec2}>
                <View style={styles.sec2_green_box}>
                    <Text style={styles.sec2_green_box_text}>
                        خرید محصول را حتما پیشنهاد میکنم.
                    </Text>
                </View>
                <Text style={styles.sec2_text}>
                من که 3ماهه دارمش کاراییش مثل روز اول عالی و بی نقصه وهیچ افت گرافیکی یا بی کیفیتی نداشته   
                </Text>
            </View>

            {
                change_height?
                    null
                :
                    <View style={[styles.sec2,change_height?{height:0}:{height:200}]}>
                        <Rait_sq />
                    </View>
            }

            <TouchableOpacity style={styles.btn} onPress={()=>_Change_height_size()}>
                <Text style={styles.btn_text}>
                    {change_text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        width:null,
        height:null,
        elevation:2,
        paddingBottom:0,
        backgroundColor:'#fff'
    },
    sec1:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#c5c5c5'
    },
    sec1_left:{
        flexDirection:'row'
    },
    box_like:{
        width:60,
        height:30,
        flexDirection:'row',
        marginRight:10,
        justifyContent:'space-around',
        alignItems:'center',
        borderColor:'#666',
        borderWidth:.8,
        borderRadius:5,
    },
    sec1_right:{
        
    },
    sec2:{
        padding:10,
    },
    sec2_green_box:{
        width:null,
        height:null,
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#adfca9',
        borderColor:'#73f96c',
        borderWidth:1,
        borderRadius:10,
    },
    sec2_text:{
        margin:15
    },
    btn:{
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        bottom:0
    },
    btn_text:{
        color:'#999',
        fontSize:13,
        fontFamily:'IRANSansMobile_Light',
    },
    icongray:{
        fontSize:22,
        color:'#999'
    },
    texth3:{
        fontFamily:'IRANSansMobile_Light',
        color:'#222',
        fontSize:16
    },
    texth5:{
        fontFamily:'IRANSansMobile_Light',
        color:'#999',
        fontSize:8
    }
})

export default React.memo(People_Comment);