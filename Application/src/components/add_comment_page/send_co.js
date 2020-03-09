import React,{useState} from 'react'
import {Text,View,TextInput,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Send_Co =(props)=>{
    return(
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.text}>عنوان نقد و برسی شما *</Text>
                <TextInput 
                    style={[styles.textIn,{width:'100%',}]}
                    onChangeText={(e)=>props.usertitleHandler(e)}
                />
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>نقات قوت</Text>
                <View style={styles.boxIcon}>
                    <Icon name={"plus"} size={24} style={styles.icon} onPress={props._addPosetiveItem}/>
                    <TextInput 
                        style={styles.textIn}
                        onChangeText={(e)=>props.userpositiveHandler(e)}
                        value={props.positive}
                    />
                </View>
                {
                    props.positiveArr.map((item)=>(
                        <View style={styles.FD_row}>
                            <Text style={styles.h3Green}>{item}</Text>
                            <Icon name={'plus'} style={styles.h3Green} />
                        </View>
                    ))
                }
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>نقاط ضعف</Text>
                <View style={styles.boxIcon}>
                    <Icon name={"plus"} size={24} style={styles.icon} onPress={props._addNegetiveItem}/>
                    <TextInput 
                        style={styles.textIn}
                        onChangeText={(e)=>props.usernegetiveHandler(e)}
                        value={props.negetive}
                    />
                </View>
                {
                    props.negetiveArr.map((item)=>(
                        <View style={styles.FD_row}>
                            <Text style={styles.h3Red}>{item}</Text>
                            <Icon name={'minus'} style={styles.h3Red} />
                        </View>
                    ))
                }
            </View>
            <TextInput 
                style={styles.textIn_multiline}
                multiline
                numberOfLines={6}
                placeholder='متن نقد و برسی شما *'
                placeholderTextColor="#888"
                onChangeText={(e)=>props.userdiscHandler(e)}
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
        marginTop:10
    },
    textIn:{
        width:'85%',
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
    },
    boxIcon:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    },
    icon:{
        borderRadius:100,
        backgroundColor:'red',
        padding:5,
        color:'#fff'
    },
    FD_row:{
        paddingRight:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    h3Green:{
        color:'green',
        fontSize:14,
        padding:2
    },
    h3Red:{
        color:'red',
        fontSize:14,
        padding:2
    },
})

export default React.memo(Send_Co);