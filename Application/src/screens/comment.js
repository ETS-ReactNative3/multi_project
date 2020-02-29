import React,{useState} from 'react'
import {ScrollView,View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ripple from 'react-native-material-ripple'
import {useNavigation} from 'react-navigation-hooks'

import My_Header from '../components/header/my_header'
import Rating from '../components/comment_page/rating'
import People_Comment from '../components/comment_page/people_commment'

let props ={
    head_name:'ForrgetPass',
    head_page_name:'نظرات کاربران'
}

const Comment =() => {

    const {navigate}=useNavigation();

    const [filter_name,setFilter_name]=useState('جدید ترین نظرات')
    const [check_filter,setCheck_filter]=useState(true)
    const change_sort_name =()=>{
        check_filter==true?
            setFilter_name('مهمترین نظرات')
            :
            setFilter_name('جدید ترین نظرات')

        setCheck_filter(!check_filter)
    }

    return(
        <View>
            <ScrollView style={styles.container}>
                <My_Header {...props} />

                <View style={styles.name_view}>
                    <Text style={styles.name_text}>هدفون</Text>
                </View>

                <View style={styles.padd10}>
                    <Rating />

                    <View style={styles.filter}>
                        <TouchableOpacity activeOpacity={1} style={[styles.filter_ch,styles.sort_border]} onPress={()=>change_sort_name()}>
                            <Text style={styles.texth3}>{filter_name}</Text>
                            <MIcon name="sort" style={styles.texth3} />
                        </TouchableOpacity>
                        <View style={styles.filter_ch}>
                            <Text style={styles.texth3}>
                                15 - نفر
                            </Text>
                            <Text style={styles.texth3}>
                                نظرات کاربران
                            </Text>
                        </View>
                    </View>

                    <People_Comment/>
                    <People_Comment/>
                    <People_Comment/>
                    <People_Comment/>
                </View>
            </ScrollView>

            <Ripple style={styles.btn} onPress={()=>navigate('Add_Comment')}>
                <MCIcon name='pencil' style={styles.btn_icon}/>
            </Ripple>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ddd',
    },
    name_view:{
        width:'100%',
        height:null,
    },
    name_text:{
        width:'100%',
        fontSize:17,
        fontFamily:'IRANSansMobile_Light',
        color:'#222',
        textAlign:'center',
        padding:15,
    },
    padd10:{
        padding:10,
        paddingTop:0
    },
    filter:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between' 
    },
    filter_ch:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    texth3:{
        fontFamily:'B Nazanin',
        fontSize:18,
        paddingLeft:2.5
    },
    sort_border:{
        borderWidth:0.7,
        borderColor:'#666',
        padding:2,
        paddingRight:8,
        paddingLeft:8,
        borderRadius:5,
        backgroundColor:'#fff'
    },
    btn:{
        position:'absolute',
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'#ef394e',
        alignItems:'center',
        justifyContent:'center',
        bottom:0,
        margin:15
    },
    btn_icon:{
        fontSize:17,
        color:'#fff'
    }
})

export default React.memo(Comment)