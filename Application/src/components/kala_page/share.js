import React,{useState,useEffect} from 'react'
import {Text,StyleSheet,View,Dimensions,Share} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {kala_share} from '../../data/dataArray';
import Ripple from 'react-native-material-ripple'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

const w = Dimensions.get('window').width;

const Sharee = (props) => {

    const [shareValue,setShareValue]=useState('');
    const [heart_color,setHeart_color]=useState(false)
    const [bell_color,setBell_color]=useState(false)
    const [k_ename,setk_ename]=useState(false)
    const [k_pname,setk_pname]=useState(false)

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
                          ename,
                        }
                      }
                    `, 
                    variables : {
                        "page": 1,
                        "limit": 10,
                        "productId": props.item_id,
                        "categoryId" : null
                    }
                }
                })
              .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    setk_ename(response.data.data.getProduct[0].ename)
                    setk_pname(response.data.data.getProduct[0].fname)
                }
              })
              .catch(function (error) {
                console.log(error)
            });
        }

        
        fetchData()
    },[])

    const ShareKala = () =>{
        Share.share({
            message:shareValue.toString()
        })
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.box1}>
                <Ripple style={styles.btn} onPress={()=>ShareKala()}>
                    <Icon name="share-alt" size={18} color="#999"/>
                </Ripple>
                <Ripple style={styles.btn} onPress={()=>setBell_color(!bell_color)}>
                    <Icon name="bell" size={18} color={bell_color?'#e7f300':'#999'} />
                </Ripple>
                <Ripple style={styles.btn} onPress={()=>setHeart_color(!heart_color)}>
                    <Icon name="heart" size={18} color={heart_color?'#f30b0b':'#999'}/>
                </Ripple>
            </View>
            <View style={styles.box2}>
                <Text style={styles.p_name}>
                    {k_pname}
                </Text>
                <Text style={styles.e_name}>
                    {k_pname}
                </Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        width:w,
        height:null,
        backgroundColor:'#fafafa',
        borderColor:'#ccc',
        borderTopWidth:0.5,
        borderBottomWidth:1.5,
    },
    box1:{
        flexDirection:'row',
    },
    box2:{
        marginLeft:20,
        marginRight:20
    },
    p_name:{
        color:'#111',
        fontSize:16,
        fontFamily:'IRANSansMobile_Light',
    },
    e_name:{
        color:"#777",
        fontSize:14,
        textAlign:'right',
        fontFamily:'IRANSansMobile_Light',
    },
    btn:{
        paddingLeft:16,
        paddingTop:12,
        paddingRight:18,
        paddingBottom:12,
        borderRadius:30
    }
})

export default React.memo(Sharee);