import React,{useState,useEffect} from 'react'
import {View,Text,Image,StyleSheet,TouchableOpacity,Dimensions,FlatList} from 'react-native'
import {cat_content} from '../../data/dataArray'
import {useNavigation} from 'react-navigation-hooks'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import Loader from '../common/loader'
const w = Dimensions.get('screen').width;

const Content =(props) => {

    const { navigate } = useNavigation();
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        async function fetchData() {
            axios({
                url: '/',
                method: 'post',
                headers:{'token':`${await AsyncStorage.getItem('token')}`},
                data: {
                    query: `
                        query getAllCategory($page : Int, $limit : Int, $mainCategory : Boolean, $parentCategory : Boolean, $catId : ID) {
                            getAllCategory(input : {page : $page, limit : $limit, mainCategory : $mainCategory, parentCategory : $parentCategory, catId : $catId}) {
                            _id,
                            name,
                            label,
                            parent {
                                name
                            }
                            }
                        }
                    `, 
                    variables : {
                        "page": 1,
                        "limit": 10,
                        "mainCategory": false,
                        "parentCategory": true,
                        "catId": props.id
                    }
                }
                })
              .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    //--------save token in context-----------
                    setLoading(false)
                    setData(response.data.data.getAllCategory)
                }
              })
              .catch(function (error) {
                // alert('مشکل در ارتبا با سرور');
                alert(JSON.stringify(error))
            });
        }


        fetchData()
    },[])

    return(
        <View style={{flex:1}}>
            <FlatList 
                data={data}
                renderItem={({item})=>
                    <TouchableOpacity style={styles.btn} activeOpacity={1} onPress={()=>navigate('AboutCategory',{id:item._id,header_name:item.name})}>
                        <Image
                            style={styles.img}
                            source={{uri:item.img}}
                        />
                        <Text style={styles.txt}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                }
                keyExtractor={item=>item._id}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    btn:{
        width:w,
        height:w/6,
        borderBottomWidth:.4,
        borderColor:'gray',
        flexDirection:'row',
        paddingRight:15,
        paddingLeft:15,
        justifyContent:'space-between',
        alignItems:'center'
    },
    img:{
        width:w/6,
        height:'90%',
        resizeMode:'contain'
    },
    txt:{
        fontSize:15,
        color:'#555',
        fontFamily:'IRANSansMobile',
    }
})

export default React.memo(Content)