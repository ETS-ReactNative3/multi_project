import React from 'react'
import {Text,View,TextInput,StyleSheet} from 'react-native'

const Send_Co =()=>{
    return(
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.text}>عنوان نقد و برسی شما *</Text>
                <TextInput 
                    style={styles.textIn}
                    
                />
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>نقات قوت</Text>
                <TextInput 
                    style={styles.textIn}
                />
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>نقاط ضعف</Text>
                <TextInput 
                    style={styles.textIn}
                />
            </View>
            <TextInput 
                style={styles.textIn_multiline}
                multiline
                numberOfLines={6}
                placeholder='متن نقد و برسی شما *'
                placeholderTextColor="#888"
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        marginTop:20
    },
    view:{
        width:'100%',
        height:null,
        justifyContent:'flex-end'
    },
    text:{
        fontSize:16,
        fontFamily:'IRANSansMobile_Light',
        color:'#777',
    },
    textIn:{
        width:'100%',
        backgroundColor:'#FFF',
        marginBottom:10,
        marginTop:15,
        fontSize:16,
        color:'#666',
        height:60,
        textAlign:'right',
    },
    textIn_multiline:{
        width:'100%',
        height:null,
        backgroundColor:'#FFF',
        marginBottom:10,
        marginTop:15,
        fontSize:16,
        color:'#666',
        textAlignVertical:'top',
        textAlign:'right',
    }
})

export default React.memo(Send_Co);