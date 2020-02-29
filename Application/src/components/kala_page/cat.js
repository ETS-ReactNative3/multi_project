import React,{useState,useEffect} from 'react'
import {ScrollView,TouchableOpacity,Text,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {cat_list} from '../../data/dataArray'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import {useNavigation} from 'react-navigation-hooks'

const Cat = (props) => {

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
                        "catId": props.item_id
                    }
                }
                })
              .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
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



    return(
        <ScrollView 
            style={styles.container} 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {
                data.map((item,key)=>(
                    <TouchableOpacity style={styles.btn} key={item._id}>
                        <Icon name='keyboard-arrow-left' size={18} color="#bbb" />
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    container:{
        marginTop:10,
        marginBottom:4
    },
    btn:{
        paddingTop:6,
        paddingBottom:6,
        paddingRight:14,
        paddingLeft:10,
        backgroundColor:'#fff',
        borderRadius:100,
        marginLeft:5,
        marginRight:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:'#13c3ea',
        fontSize:14,
        fontFamily:'IRANSansMobile_Light',

    }
})

export default React.memo(Cat);