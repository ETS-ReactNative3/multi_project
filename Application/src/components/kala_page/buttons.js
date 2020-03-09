import React,{useState,useEffect,useContext} from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import Ripple from 'react-native-material-ripple'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useNavigation} from 'react-navigation-hooks'
import axios from 'axios'

const w = Dimensions.get('window').width;

const Buttons = (props) => {

    const {navigate,getParam}=useNavigation();
    const [cat,SETcat]=useState(null)

    useEffect(()=>{
        async function fetchData() {
            axios({
                url: '/',
                method: 'post',
                data: {
                    query: `
                    query getProduct($page : Int, $limit : Int, $productId : ID, $categoryId : ID) {
                        getProduct(page : $page, limit : $limit, productId : $productId, categoryId : $categoryId){
                        _id,
                        category{
                            _id
                          },
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
                    const {getProduct}=response.data.data;
                        SETcat(getProduct[0].category._id)
                }
              })
              .catch(function (error) {
                alert(error)
            });
        }

        
        fetchData()
    },[])

    return(
        <View style={styles.container}>
            <Ripple style={styles.btn} onPress={()=>navigate('Comment',{head_name:props.head_name,p_id:props.item_id,c_id:cat})}>
                <Text style={styles.txt}>
                    نظرات کاربران
                </Text>
                <Icon name="content-paste" style={styles.txt} />
            </Ripple>
            <Ripple style={styles.btn} onPress={()=>navigate('Kala_specification',{id:props.item_id})}>
                <Text style={styles.txt}>
                    مشخصات
                </Text>
                <Icon name="forum" style={styles.txt} />
            </Ripple>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        marginTop:10,
        width:null,
        height:w/12,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    btn:{
        width:'48%',
        height:'100%',
        backgroundColor:'#fff',
        elevation:2,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    txt:{
        color:'#7a707f',
        fontSize:14,
        paddingLeft:4,
        fontFamily:'IRANSansMobile_Light',
    }
})

export default React.memo(Buttons);