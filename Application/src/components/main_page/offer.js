import React ,{useEffect, useState}from 'react'
import {View,Image,StyleSheet,Dimensions} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {offer_list} from '../../data/dataArray'
import {off_list} from '../../data/dataArray'
import {useNavigation} from 'react-navigation-hooks'
import axios from 'axios'

const w = Dimensions.get('window').width;



const Offer = () => {

    const { navigate } = useNavigation();

    const [data,SETdata]=useState([])
    const [data_category,SETdata_category]=useState([])

    useEffect(()=>{
        axios({
            url: '/',
            method: 'post',
            data: {
                query: `
                query MainPageApp {
                    MainPageApp {
                      banner {
                            category {
                                _id,
                                name
                            },
                            image {
                                dir
                            }
                          }
                    }
                  }
                ` 
            }
            })
            .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    SETdata(response.data.data.MainPageApp.banner)
                    SETdata_category(response.data.data.MainPageApp.banner.category)
                    // alert(JSON.stringify(response.data.data.MainPageApp.banner.image))
                }
            })
            .catch(function (error) {
            alert('er'+error)
        });
    },[])


    return(
        <>
            <View style={styles.container}>
                {
                    data.map((item,key)=>(
                        <React.Fragment key={key}>
                            {
                                key==0 || key==6?(
                                    <Ripple style={styles.btn_full}  onPress={()=>navigate('Off',{header_name:item.category.name,item_id:item.category._id})}>
                                        <Image 
                                            style={styles.btn_full_img}
                                            source={{uri:'https://digikala.liara.run'+item.image.dir}}
                                        />
                                    </Ripple>
                                )
                                :
                                    key==3?(
                                        <Ripple style={styles.one_box} key={item.category._id} onPress={()=>navigate('Off',{header_name:item.category.name,item_id:item.category._id})}>
                                            <Image 
                                                style={styles.img}
                                                source={{uri:'https://digikala.liara.run'+item.image.dir}}
                                            />
                                        </Ripple>
                                    )
                                    :
                                    (
                                        <Ripple style={styles.two_box} key={item.category._id} onPress={()=>navigate('Off',{header_name:item.category.name,item_id:item.category._id})}>
                                            <Image 
                                                style={styles.img}
                                                source={{uri:'https://digikala.liara.run'+item.image.dir}}
                                            />
                                        </Ripple>
                                    )
                            }
                        </React.Fragment>
                    ))
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around'
    },
    one_box:{
        width:'97%',
        height:w/3.7,
        borderRadius:10,
    },
    two_box:{
        width:'47%',
        height:w/3.7,
        marginTop:15,
        marginBottom:15,
        borderRadius:10
    },
    img:{
        width:'100%',
        height:'100%',
        borderRadius:10,
        backgroundColor: '#ddd'
    },
    btn_full:{
        width:'100%',
        height: w/3.2,
        marginTop:15,
        marginBottom:10
    },
    btn_full_img:{
        width:'100%',
        height:'100%',
        backgroundColor: '#ddd'
    }
})


export default React.memo(Offer);