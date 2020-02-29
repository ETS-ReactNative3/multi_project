import React,{useState} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity,CheckBox,Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ripple from 'react-native-material-ripple'

// import {AuthContext} from '../../context/Auth/AuthContext';


const Body =(props) => {
    // const {dispatch} = useContext(AuthContext);

    const [user,setUser]=useState(false)
    const [pass,setpass]=useState(false)

    _changeBorderUser=()=>{
        setUser(true)
        setpass(false)
    }
    _changeBorderPass=()=>{
        setUser(false)
        setpass(true)
    }

    return(
        <View style={styles.container}>
            <View style={styles.sec1}>
                <TouchableOpacity 
                    style={[styles.sec1_p,user?{borderColor:'green'}:{}]}
                    activeOpacity={0.9}
                    onPress={()=>_changeBorderUser()}
                >
                    {
                        user?
                        <Text style={styles.sec1_p_text}>
                            شماره موبایل
                        </Text>
                        :
                        null
                    }
                    <TextInput
                        placeholder="شماره موبایل"
                        placeholderTextColor='#999'
                        onFocus={()=>_changeBorderUser()}
                        style={styles.text_input}
                        onChangeText={(e)=>props.usernameHandler(e)}
                    />
                    <Icon name='email' size={25} color='#aaa' style={styles.text_input_icon}/>
                </TouchableOpacity>  

                <TouchableOpacity 
                    style={[styles.sec1_p,pass?{borderColor:'green'}:{}]}
                    activeOpacity={0.9}
                    onPress={()=>_changeBorderPass()}
                >
                    {
                        pass?
                        <Text style={styles.sec1_p_text}>
                            کلمه عبور
                        </Text>
                        :
                        null
                    }
                    <TextInput
                        placeholder="کلمه عبور"
                        placeholderTextColor='#999'
                        secureTextEntry={true}
                        onFocus={()=>_changeBorderPass()}
                        style={styles.text_input}
                        onChangeText={(e)=>props.userpassHandler(e)}
                    />
                    <Icon name='lock' size={25} color='#aaa' style={styles.text_input_icon}/>
                </TouchableOpacity>   
            </View>  
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        padding:20,
        paddingTop:0,
        justifyContent:'flex-start',
        // alignItems: 'center'
    },
    sec1:{
        alignItems:'center',
        justifyContent:'center'
    },
    sec1_p:{
        margin:5,
        marginTop:30,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        borderBottomWidth:1.5,
        borderColor:'#666',
        width:'90%'
    },
    text_input:{
        padding:5,
        width:'95%',
        textAlign:'right',
        paddingBottom:-20
    },
    text_input_icon:{
        position:'relative'
    },
    sec1_p_text:{
        color:'rgb(0,128,255)',
        fontSize:12,
        position:'absolute',
        paddingBottom:35,
        paddingRight:30
    }
})

export default React.memo(Body)