import React,{useEffect,useState} from 'react'
import {ScrollView,TouchableOpacity,Text,StyleSheet} from 'react-native'
import {cat_list} from '../../data/dataArray'
import {useNavigation} from 'react-navigation-hooks'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

const Cat = () => {

    const { navigate } = useNavigation();
    const [data,SETdata]=useState([])

    useEffect(()=>{
        axios({
            url: '/',
            method: 'post',
            data: {
                query: `
                    query MainPageApp {
                        MainPageApp {
                            category {
                                _id,
                                name
                            }
                        
                    }
                    }
                `
            }
            })
            .then(function (response) {
                if(response.data.errors){
                    alert('error' + response.data.errors[0].message)
                }
                else{
                    //--------save token in context-----------
                    SETdata(response.data.data.MainPageApp.category)
                    // alert(JSON.stringify(response.data.data.MainPageApp.category))
                }
            })
            .catch(function (error) {
            // alert('مشکل در ارتبا با سرور');
            alert(JSON.stringify('catch error' + error))
        });
    },[])
    
    return(
        <ScrollView 
            style={styles.container} 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {
                data.map((item,key)=>(
                    <TouchableOpacity key={item._id} style={styles.btn} onPress={()=>navigate('Category',{num_tab:key})}>
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
        paddingTop:3,
        paddingBottom:3,
        paddingRight:10,
        paddingLeft:10,
        backgroundColor:'#66bb6a',
        borderRadius:100,
        marginLeft:5,
        marginRight:5
    },
    text:{
        color:'#fff',
        fontSize:14,
        fontFamily:'IRANSansMobile_Light'
    }
})

export default React.memo(Cat);