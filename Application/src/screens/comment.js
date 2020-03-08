import React,{useState,useEffect} from 'react'
import {ScrollView,View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ripple from 'react-native-material-ripple'
import {useNavigation} from 'react-navigation-hooks'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import My_Header from '../components/header/my_header'
import Rating from '../components/comment_page/rating'
import People_Comment from '../components/comment_page/people_commment'

const h_props ={
    head_name:'ForrgetPass',
    head_page_name:'نظرات کاربران'
}

const Comment =(pops) => {

    const {navigate,getParam}=useNavigation();
    const head_name = getParam('head_name')
    const p_id = getParam('p_id')
    const c_id = getParam('c_id')
    
    const [filter_name,setFilter_name]=useState('جدید ترین نظرات')
    const [check_filter,setCheck_filter]=useState(true)
    const [loading,SETloading]=useState(false)
    const [data,SETdata]=useState([])

    const change_sort_name =()=>{
        check_filter==true?
            setFilter_name('مهمترین نظرات')
            :
            setFilter_name('جدید ترین نظرات')

        setCheck_filter(!check_filter)
    }

    useEffect(()=>{
        async function _showComent() {
            axios({
                url: '/',
                method: 'post',
                data: {
                    query: `
                        query getAllComment($page : Int, $limit : Int, $productId : ID, $commentId : ID) {
                            getAllComment(page : $page, limit : $limit, productId : $productId, commentId : $commentId) {
                            _id
                            user {
                                fname,
                                lname
                            },
                            product {
                                fname
                            },
                            survey {
                                survey {
                                name
                                },
                                value
                            },
                            title,
                            description,
                            negative,
                            positive,
                            like {
                                _id
                            },
                            dislike {
                                _id
                            },
                            createdAt,
                            check
                            
                            }
                        }
                    `, 
                    variables : {
                        "page": 1,
                        "limit": 10,
                        "productId": p_id,
                        "commentId": null
                    }
                }
                })
            .then(function (response) {
                if(response.data.errors){
                    alert(JSON.stringify(response.data.errors))
                }
                else{
                    SETdata(response.data.data.getAllComment)
                    // alert(JSON.stringify(response.data.data.getAllComment))
                }
            })
            .catch(function (error) {
                    alert(JSON.stringify('err '+error))
            });
        }

        _showComent()
    },[])

    
    return(
        <View>
            <ScrollView style={styles.container}>
                <My_Header {...h_props} />

                <View style={styles.name_view}>
                    <Text style={styles.name_text}>{head_name}</Text>
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
                                {data.length} - نفر
                            </Text>
                            <Text style={styles.texth3}>
                                نظرات کاربران
                            </Text>
                        </View>
                    </View>

                    {
                        data.map((item)=>(
                            <People_Comment item={item}/>
                        ))
                    }

                </View>
            </ScrollView>

            <Ripple style={styles.btn} onPress={()=>navigate('Add_Comment',{c_id:c_id,p_id:p_id})}>
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