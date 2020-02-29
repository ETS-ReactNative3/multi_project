import React,{useState} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity,Text,Dimensions} from 'react-native'
import Ripple from 'react-native-material-ripple'
import CodeInput from 'react-native-confirmation-code-field';
import {useNavigation} from 'react-navigation-hooks'

const w = Dimensions.get('window').width;

const Content =() => {
    const { navigate } = useNavigation();
    const [errorCode,setErrorCode]=useState(false);

    const handlerOnFulfill = (code) => {
        if (code==11111) {
          alert('کد درست است')
          setErrorCode(false)
        } else {
          setErrorCode(true)
        }
    };

      
    return(
        <View style={styles.container}>
            <View style={styles.sec1}>
                <Text style={styles.sec1_t1}>
                  کد تایید برای شماره 09150003423 ارسال گردید
                </Text>
                <Text style={styles.sec1_t2} onPress={()=>navigate('Login')}>
                    ویرایش شماره تماس
                </Text>
            </View>
            <View style={styles.sec2}>
                <Text style={styles.sec2_t1}>
                    کد تایید را وارید نمایید
                </Text>
                <View style={styles.sec2_p2}>
                    <CodeInput 
                        activeColor='#61af5c'
                        inactiveColor='#aeaeae'
                        variant='border-b'
                        cellBorderWidth={2}
                        size={50}
                        space={20}
                        fontColor='#3b3b3b'
                        keyboardType='number-pad'
                        font_Sise={20}
                        onFulfill={handlerOnFulfill}
                    />
                </View>
                {
                    errorCode?
                    <Text style={styles.sec2_t2}>
                        کد وارد شده اشتباه است
                    </Text>
                    :
                    null
                }
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        padding:20,
        paddingLeft:30,
        paddingRight:30,
        justifyContent:'flex-start',
        // alignItems: 'center'
    },
    sec1:{
        width:null,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#5ba056',
        padding:15,
        justifyContent:'space-between'
    },
    sec1_t1:{
        fontSize:14,
        color:'#666',
        paddingTop:5,
        paddingBottom:10,
        fontFamily:'IRANSansMobile',
    },
    sec1_t2:{
        fontSize:14,
        color:'#43a3e7',
        paddingTop:10,
        paddingBottom:5,
        fontFamily:'IRANSansMobile',
    },
    sec2:{
        marginTop:35,
    },
    sec2_t1:{
        fontSize:15,
        color:'#888',
        fontFamily:'IRANSansMobile',
    },
    sec2_p2:{
        marginTop:25,
        marginLeft:15,
        height:20,
        alignItems:'center',
        justifyContent:'center',
    },
    sec2_t2:{
        color:'red',
        fontSize:13,
        top:40,
        right:10
    }
})

export default React.memo(Content)