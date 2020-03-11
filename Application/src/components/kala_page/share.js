import React,{useState,useEffect,useContext} from 'react'
import {Text,StyleSheet,View,Dimensions,Share,ToastAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {kala_share} from '../../data/dataArray';
import Ripple from 'react-native-material-ripple'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import {BascketContext} from '../../context/Basc/bascketContext'

const w = Dimensions.get('window').width;

const Sharee = (props) => {

    const {_set_product_Ename,_set_product_name,_set_product_id}=useContext(BascketContext);

    const [shareValue,setShareValue]=useState('');
    const [heart_color,setHeart_color]=useState(false)
    const [bell_color,setBell_color]=useState(false)
    const [k_ename,setk_ename]=useState(false)
    const [k_pname,setk_pname]=useState(false)
    const [favorite,setFavorite] = useState(false);
    const [tokenState,setTokenState] = useState(null);
    const [productId,setProductId] = useState(null)
    useEffect(()=>{
        async function fetchData() {
            const token = await AsyncStorage.getItem('token');
            setTokenState(token)
            axios({
                url: '/',
                method: 'post',
                // headers:{'token':`${await AsyncStorage.getItem('token')}`},
                data: {
                    query: `
                    query getProduct($page : Int, $limit : Int, $productId : ID, $categoryId : ID) {
                        getProduct(page : $page, limit : $limit, productId : $productId, categoryId : $categoryId){
                          _id,
                          fname,
                          ename
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
                    const {ename ,fname ,  _id} = response.data.data.getProduct[0]
                    setk_ename(ename)
                    setk_pname(fname)
                    _set_product_Ename(ename)
                    _set_product_name(fname)
                    _set_product_id(_id)
                    setProductId(_id);
                    axios({
                        url: '/',
                        method: 'post',
                         headers:{'token':`${token}`},
                        data: {
                            query: `
                            query getFavorite{
                                getFavorite(productId : "${_id}") {
                                  status,
                                  message,
                                  checkfavorite
                                }
                              }
                    
                            `
                            }
                        }).then((response)=>{
                          const {checkfavorite} = response.data.data.getFavorite;
                          setFavorite(checkfavorite);
                            
                        }).catch((error)=>{
                            console.log(error)
                        })
        
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


    const faviorteHandler = ()=>{
        let check = null;
        if(favorite){
            check = true
        }
        else{
            check = false
        }
        axios({
            url: '/',
            method: 'post',
             headers:{'token':`${tokenState}`},
            data: {
                query: `
                mutation addFavorite($productId : ID!, $uncheck : Boolean) {
                    favorite(productId : $productId, uncheck : $uncheck) {
                      status,
                      message,
                      checkfavorite
                    }
                  }
                `, 
                variables : {
                    "productId": productId,
                    "uncheck" : check
                  }
                }
            }).then((response)=>{
             const {message,checkfavorite} =response.data.data.favorite;
             if(checkfavorite){
                setFavorite(true);
                ToastAndroid.show(
                    message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                )
             }
             else{
                setFavorite(false);
                ToastAndroid.show(
                    message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                )
             }
                
            }).catch((error)=>{
                console.log(error)
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
                <Ripple style={styles.btn} onPress={faviorteHandler}>
                    <Icon name="heart" size={18} color={favorite?'#f30b0b':'#999'}/>
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