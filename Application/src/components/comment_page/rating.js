import React,{useState} from 'react'
import {Text,StyleSheet,View,Dimensions,TouchableOpacity,UIManager,LayoutAnimation} from 'react-native'
import Stars from 'react-native-stars'
import Rait_sq from '../common/rait_sq'

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


const Rating = () => {
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
        padding:5,
        paddingBottom:0,
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
    }
})

export default React.memo(Rating);