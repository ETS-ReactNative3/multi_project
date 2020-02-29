import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,FlatList,Dimensions,TouchableOpacity} from 'react-native'
import {kala} from '../../data/dataArray'
import Ripple from 'react-native-material-ripple'
import {useNavigation} from 'react-navigation-hooks'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

const w = Dimensions.get('window').width;


const Cat = (props) => {

    const [data,setData]=useState([])
    const [open_cat,setOpen_cat]=useState(false)
    const [id_open_cat,setIdopencat]=useState()

    const { navigate } = useNavigation();

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
                        "catId": props.item_id
                    }
                }
                })
              .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    //--------save token in context-----------
                    
                    setData(response.data.data.getAllCategory)
                    // console.log(response.data.data.getAllCategory)
                }
              })
              .catch(function (error) {
                // alert('مشکل در ارتبا با سرور');
                alert(JSON.stringify(error))
            });
        }

        fetchData()
    },[])



    const _open_cat =(e)=>{
        setOpen_cat(!open_cat)
        setIdopencat(e)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text_black}>
                دسته بندی
            </Text>
            <View>
                {
                    data.map((item,key)=>(
                        <TouchableOpacity style={styles.child} key={item._id} onPress={()=>navigate('Off',{id:item._id,header_name:item.name})}>
                            <Text style={styles.text_gray}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                        /* <>
                            {
                                open_cat?
                                    <TouchableOpacity style={styles.child} key={item._id} onPress={()=>navigate('Off',{id:item._id,header_name:item.name})}>
                                        <Text style={styles.text_gray}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                :
                                    <>
                                        <TouchableOpacity style={styles.child} onPress={()=>_open_cat(item.id)}>
                                            {
                                                open_cat?
                                                    <Icon name={'chevron-up'} style={styles.icon}/>
                                                :
                                                    <Icon name={'chevron-down'} style={styles.icon}/>
                                            }
                                            <Text style={styles.text_black}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                        {
                                            open_cat && item.id==id_open_cat ?
                                                dataArray.map((item,key)=>(
                                                    <TouchableOpacity style={styles.child}>
                                                        <Text style={styles.text_gray}>
                                                            {item.name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))
                                            :
                                                null
                                        }
                                    </>
                            }
                        </> */
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
    },
    parent:{
        width:null,
        height:null,
    },
    child:{
        width:'100%',
        height:null,
        padding:10,
        borderBottomColor:'#888',
        borderBottomWidth:0.5,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    icon:{
        fontSize:20
    },
    text_black:{
        fontSize:15,
        paddingRight:5
    },
    text_gray:{
        width:'100%',
        textAlign:'right',
        fontSize:14,
        color:'#444',
        paddingRight:5
    }
})

export default React.memo(Cat);