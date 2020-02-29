import React,{useState,useEffect} from 'react'
import {View,StyleSheet,Text,ScrollView,SafeAreaView} from 'react-native'
import My_Header from '../components/header/my_header'
import {specific_data} from '../data/dataArray'
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import {useNavigation} from 'react-navigation-hooks'

import Loader from '../components/common/loader'

const props ={
    head_name:'ForrgetPass',
    head_page_name:'مشخصات'
}
  



    
const Kala_specification =() => {

    const {getParam} = useNavigation();
    const id = getParam('id')

    const [data,SETdata]=useState([])
    const [_name,SETname]=useState([])
    const [Id,SETid]=useState([])
    const [loading,setLoading]=useState(true)
    const [specs,setSpecs]=useState([])

    useEffect(()=>{
        async function fetchData() {
            axios({
                url: '/',
                method: 'post',
                headers:{'token':`${await AsyncStorage.getItem('token')}`},
                data: {
                    query: `
                    query getProduct($page : Int, $limit : Int, $productId : ID, $categoryId : ID) {
                        getProduct(page : $page, limit : $limit, productId : $productId, categoryId : $categoryId){
                        _id,
                        fname,
                        details {
                            _id,
                            value,
                            label,
                            p_details {
                              _id,
                              name,               
                              specs {
                                specs
              
                              }
                            }
                          }
                        category{
                            _id,
                            name,
                            parent {
                              _id,
                              name
                              parent {
                                _id,
                                name
                              }
                            }
                          },
                        }
                      }

                    `, 
                    variables : {
                        "page": 1,
                        "limit": 10,
                        "productId": id,
                        "categoryId" : null
                    }
                }
                })
              .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    const {getProduct} =response.data.data; 
                    let specId=null;
                        if(getProduct[0].category.parent.parent){
                            specId =getProduct[0].category.parent._id;
                        }
                        else if(!getProduct[0].category.parent.parent){
                            specId =getProduct[0].category._id
                        }
                        console.log(specId)
                        FetchSpecs(specId,getProduct);

                        SETname(response.data.data.getProduct[0].fname)
                }
              })
              .catch(function (error) {
                console.log(error)
            });
        }

        
        fetchData()
    },[])

    const FetchSpecs = async(specId,getProduct)=>{
        axios({
            url: '/',
            method: 'post',
            headers:{'token':`${await AsyncStorage.getItem('token')}`},
            data: {
              query: `
              query addProductInfo($categoryId : ID, $getSubCategory : Boolean!, $subCategoryId : ID){
                getAddProductInfo(categoryId : $categoryId, getSubCategory : $getSubCategory, subCategoryId : $subCategoryId) {
                  specs {
                    _id,
                    specs,
                    details {
                      _id,
                      name,

                    }
                  },
                }
              }      
                `,
                variables :{
                  "categoryId": null,
                  "getSubCategory": true,
                  "subCategoryId": specId
                }
          }
          }).then((result)=>{
            if(result.data.errors){
                setMessage('خطا در دریافت اطلاعات مشخصات')
              }
              else{
                const {specs}= result.data.data.getAddProductInfo ;     
                const productDetailes =    getProduct[0].details; 
      
                for(var i=0;i<specs.length;i++){
                  for(var j=0;j<specs[i].details.length;j++)
                  {             
                      for(let c=0;c<productDetailes.length;c++){
                        if(productDetailes[c].p_details._id  == specs[i].details[j]._id)
                        {
                          specs[i].details[j].value=productDetailes[c].value;
                          specs[i].details[j].label=productDetailes[c].label;
                          specs[i].details[j].ID =productDetailes[c]._id
                        }
      
                        
                      }
                  }
                    
                }
                
                setSpecs(specs); 
                setLoading(false);
              }
          }).catch((error)=>{
              console.log(error)
          })

    }

    return(
        <SafeAreaView style={styles.container}>
            <My_Header {...props}/>
            <View style={styles.head_name_style}>
                <Animatable.Text
                    style={styles.head_name_style_text}
                    animation='bounceInRight'
                >
                    {_name}
                </Animatable.Text>
            </View>
            {
                loading?
                    <View style={{flex:1}}>
                        <Loader/>
                    </View>
                :
                    <ScrollView>
                        {
                            specs.map((item,key)=>(
                                <>
                                    <Animatable.Text
                                        key ={item._id}
                                        style={styles.item_header}
                                        animation='fadeInRightBig'
                                        delay={key*130}
                                        duration={500}
                                    >
                                        {item.specs}
                                    </Animatable.Text>
                                    {
                                        item.details.map((item,key)=>(
                                            <Animatable.View 
                                                key ={item._id}
                                                style={styles.item_box}
                                                animation='fadeInRightBig'
                                                delay={key*130}
                                                duration={500}
                                            >
                                                <View style={styles.item_box_left}>
                                                    <Text style={styles.h4_light}>
                                                        {item.value}
                                                    </Text>
                                                </View>
                                                <View style={styles.item_box_right}>
                                                    <Text style={styles.h4_dark}>
                                                        {item.name}
                                                    </Text> 
                                                </View>
                                            </Animatable.View>
                                        ))
                                    }
                                </>
                            ))
                        }
                    </ScrollView>
            }
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    head_name_style:{
        height:40,
        alignItems:"center",
        justifyContent:'center',
    },
    head_name_style_text:{
        fontSize:13,
        color:'#666'
    },
    item_box:{
        flexDirection:'row',
        borderTopWidth:1,
        borderColor:'#f2f2f2'
    },
    item_box_right:{
        padding:10,
        width:'44%',
        borderLeftWidth:0.6,
        borderColor:'#f2f2f2',
        paddingRight:15
    },
    item_box_left:{
        padding:10,
        width:'56%',
        paddingRight:15
    },
    item_header:{
        padding:12,
        alignItems:'center',
        backgroundColor:'#e6e6e6',
        paddingRight:15,
        fontSize:11,
        color:'#262626',
        fontFamily:'IRANSansMobile_Bold'
    },
    h4_dark:{
        fontSize:12,
        color:'#666',
        fontFamily:'IRANSansMobile_Light'
    },
    h4_light:{
        fontSize:12,
        color:'#999',
        fontFamily:'IRANSansMobile_Light'
    },
})
export default React.memo(Kala_specification)