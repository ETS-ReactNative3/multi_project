import React,{useState,useEffect} from 'react'
import {StyleSheet,View,Image,Text,Dimensions,Modal} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {off_data} from '../../data/dataArray'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import FIcon from 'react-native-vector-icons/Feather'
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import MAIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {kala} from '../../data/dataArray';
import {useNavigation} from 'react-navigation-hooks'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

// import Cat from '../kala_page/cat'

const w = Dimensions.get('window').width;


const Offs = (props) => {

    const { navigate } = useNavigation();

    const [change_box_state,setChange_box_state]=useState(1)
    const [change_box_icon,setChange_box_icon]=useState(<FIcon name="grid" style={styles.head_icon} />)
    const [showModal,setShowModal]=useState(false)
    const [selectIcon,setSelectIcon]=useState(1)
    const [dataList,setDataList]=useState([])
    const [persent,setPersent]=useState()


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
                        attribute {
                            price,
                            discount,
                            suggestion
                          }
                          image
                        }
                      }
                    `, 
                    variables : {
                        "page": 1,
                        "limit": 10,
                        "productId": null,
                        "categoryId" : '5e4ceb5e60d59a0b380f0978'
                    }
                }
                })
              .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    setDataList(response.data.data.getProduct)
                }
              })
              .catch(function (error) {
                    alert(JSON.stringify(error))
            });
        }

        
        fetchData()
    },[])


    const _change_box =()=>{
        switch (change_box_state){
            case 1:
                setChange_box_state(2);
                setChange_box_icon(<SIcon name="list" style={[styles.head_icon,{rotation:180}]} />)
                break;
            case 2:
                setChange_box_state(3);
                setChange_box_icon(<SIcon name="control-pause" style={[styles.head_icon,{rotation:90}]} />)
                break;
            case 3:
                setChange_box_state(1)
                setChange_box_icon(<FIcon name="grid" style={styles.head_icon} />)
        }
    }


    const _sort_name =()=>{
        switch (selectIcon) {
            case 1:
                return 'پر بازدید ترین '
                break;
            case 2:
                return 'پر فروش ترین'
                break;
            case 3:
                return 'قیمت از زیاد به کم'
                break;  
            case 4:
                return 'قیمت از کم به زیاد'
                break;
            case 5:
                return 'جدید ترین'
                break; 

            default:
                break;
        }
    }


    const A_header =()=>{
        return(
            <View style={styles.A_header_top}>
                <Ripple style={[styles.A_header_top_left]} onPress={()=>_change_box()}>
                    {
                        change_box_icon
                    }
                </Ripple>
                <Ripple style={[styles.center,styles.A_header_top_right,styles.border_left_right]} onPress={()=>setShowModal(true)}>
                    <View>
                        <Text style={styles.a_header_h3_text}>مرتب سازی</Text>
                        <Text style={styles.a_header_h4_text}>{_sort_name()}</Text>
                    </View>
                    <MIcon name="sort" style={styles.head_icon} />
                </Ripple>
                <View style={[styles.center,styles.A_header_top_right]}>
                    <View>
                        <Text style={styles.a_header_h3_text}>فیلتر کردن</Text>
                        <Text style={styles.a_header_h4_text}>رنگ نوع قیمت و ..</Text>
                    </View>
                    <MIcon name="filter-list" style={styles.head_icon} />
                </View>
            </View>
        )
    }


    const _change_modal_icon=(num)=>{
        setSelectIcon(num);
        setShowModal(false);
    }


    const Modall =()=>{
        return(
            <Modal visible={showModal} transparent={true}>
                <Ripple rippleColor='transparent' style={modal_s.modal_f} onPress={()=>setShowModal(false)}/>
                <View style={modal_s.modal_f}>
                    <View style={modal_s.modal_ch}>
                        <Ripple style={modal_s.modal_btn} onPress={()=>_change_modal_icon(1)}>
                            <Text style={modal_s.modal_btn_text}>
                                پر بازدیدترین
                            </Text>
                            {
                                selectIcon==1?
                                    <MAIcon name='circle-slice-8' size={22} color='#00dd00'/>
                                :
                                    <MAIcon name='circle-outline' size={22} />
                            }
                        </Ripple>
                        <Ripple style={modal_s.modal_btn} onPress={()=>_change_modal_icon(2)}>
                            <Text style={modal_s.modal_btn_text}>
                                پرفروش ترین
                            </Text>
                            {
                                selectIcon==2?
                                    <MAIcon name='circle-slice-8' size={22} color='#00dd00'/>
                                :
                                    <MAIcon name='circle-outline' size={22} />
                            }             
                        </Ripple>
                        <Ripple style={modal_s.modal_btn} onPress={()=>_change_modal_icon(3)}>
                            <Text style={modal_s.modal_btn_text}>
                                قیمت از زیاد به کم 
                            </Text>
                            {
                                selectIcon==3?
                                    <MAIcon name='circle-slice-8' size={22} color='#00dd00'/>
                                :
                                    <MAIcon name='circle-outline' size={22} />
                            }                
                        </Ripple>
                        <Ripple style={modal_s.modal_btn} onPress={()=>_change_modal_icon(4)}>
                            <Text style={modal_s.modal_btn_text}>
                                قیمت از کم به زیاد 
                            </Text>
                            {
                                selectIcon==4?
                                    <MAIcon name='circle-slice-8' size={22} color='#00dd00'/>
                                :
                                    <MAIcon name='circle-outline' size={22} />
                            }  
                        </Ripple>
                        <Ripple style={modal_s.modal_btn} onPress={()=>_change_modal_icon(5)}>
                            <Text style={modal_s.modal_btn_text}>
                                جدیدترین 
                            </Text>
                            {
                                selectIcon==5?
                                    <MAIcon name='circle-slice-8' size={22} color='#00dd00'/>
                                :
                                    <MAIcon name='circle-outline' size={22} />
                            }  
                        </Ripple>
                    </View>
                </View>
                <Ripple rippleColor='transparent' style={modal_s.modal_f} onPress={()=>setShowModal(false)}/>
            </Modal>
        )
    }


    const modal_s = StyleSheet.create({
        modal_f:{
            flex:1,
            backgroundColor:'rgba(0,0,0,0.7)',
            alignItems:'center',
            justifyContent:"center",
        },
        modal_ch:{
            width:w/1.2,
            height:null,
            backgroundColor:'#fff',
            alignItems:'flex-end'
        },
        modal_btn:{
            flexDirection:'row',
            alignItems:"center",
            paddingTop:10,
            paddingBottom:5,
            paddingRight:30,
            marginTop:2.5,
        },
        modal_btn_text:{
            marginRight:25,
            color:'#333'
        }
    })

    
    const Full =(props)=>{
        return(
            <Ripple style={full_s.box} onPress={()=>navigate('Kala',{header_name:props.data.fname,item_id:props.data._id})}>
                <View style={full_s.sec1}>
                    <View style={full_s.image_box}>
                        <Image source={{uri:props.data.img}} style={full_s.image}/>
                    </View>
                    <Text style={full_s.pName} numberOfLines={1}>
                        {props.data.fname}
                    </Text>
                    <Text style={full_s.eName} numberOfLines={1}>
                        {props.data.ename}
                    </Text>
                </View>
                <View style={full_s.sec2}>
                    <View style={full_s.box_price}>
                        {
                            props.data.attribute[0].discount==0?
                                <Text style={full_s.green_p}>
                                    {props.data.attribute[0].price} تومان
                                </Text>
                            :
                                <>
                                    <Text style={full_s.red_p}>
                                        {props.data.attribute[0].price} تومان
                                    </Text>
                                    <Text style={full_s.green_p}>
                                        {props.off} تومان
                                    </Text>
                                </>
                        }
                    </View>
                    <View style={full_s.s_s}>
                        {
                            props.data.attribute[0].suggestion?
                                <Text style={full_s.s_s_text}>پیشنهاد ویژه</Text>
                            :
                                null
                        }
                    </View>
                </View>
            </Ripple>
        )
    }


    const Half =(props)=>{
        return(
            <Ripple style={half_s.box} onPress={()=>navigate('Kala',{header_name:props.data.pname})}>
                <View style={half_s.left}>
                    <View style={half_s.box_name}>
                        <Text style={full_s.pName} numberOfLines={2}>
                            {props.data.fname}
                        </Text>
                        <Text style={full_s.eName} numberOfLines={2}>
                            {props.data.ename}
                        </Text>
                    </View>
                    <View style={half_s.box_price}>
                        <View>
                        {
                            props.data.attribute[0].discount==0?
                                <Text style={full_s.green_p}>
                                    {props.data.attribute[0].price} تومان
                                </Text>
                            :
                                <>
                                    <Text style={full_s.red_p}>
                                        {props.data.attribute[0].price} تومان
                                    </Text>
                                    <Text style={full_s.green_p}>
                                        {props.off} تومان
                                    </Text>
                                </>
                        }
                        </View>
                        <View style={full_s.s_s}>
                            {
                                props.data.attribute[0].suggestion?
                                    <Text style={full_s.s_s_text}>پیشنهاد ویژه</Text>
                                :
                                    null
                            }
                        </View>
                    </View>
                </View>
                <View style={half_s.right}>
                    <Image source={{uri:props.data.img}} style={half_s.image}/>
                </View>
            </Ripple>
        )
    }


    const Two =(props)=>{
        return(
            <Ripple style={two_s.box} onPress={()=>navigate('Kala',{header_name:props.data.pname})}>
                <View style={two_s.sec1}>
                    <View style={two_s.image_box}>
                        <Image source={{uri:props.data.img}} style={two_s.image}/>
                    </View>
                    <Text style={two_s.pName} numberOfLines={1}>
                        {props.data.fname}
                    </Text>
                </View>
                <View style={two_s.sec2}>
                    <View style={two_s.box_price}>
                        {
                            props.data.attribute[0].discount==0?
                                <Text style={full_s.green_p}>
                                    {props.data.attribute[0].price} تومان
                                </Text>
                            :
                                <>
                                    <Text style={full_s.red_p}>
                                        {props.data.attribute[0].price} تومان
                                    </Text>
                                    <Text style={full_s.green_p}>
                                        {props.off} تومان
                                    </Text>
                                </>
                        }
                    </View>
                    <View style={two_s.s_s}>
                        {
                            props.data.attribute[0].suggestion?
                                <Text style={full_s.s_s_text}>پیشنهاد ویژه</Text>
                            :
                                null
                        }
                    </View>
                </View>
            </Ripple>
        )
    }




    return(
        <View style={styles.container}>
            <Modall />
            <A_header />
            {/* <Cat item_id={props.kala_id}/> */}
            <View style={{margin:8,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
                {
                    dataList.map((item,key)=>{
                        
                        {/* let percent = 1000-(1000*(10/100)) */}
                        let percent=null;
                        if (item.attribute[0].discount != 0){
                            let _price = item.attribute[0].price;
                            let _discount = item.attribute[0].discount;
                            percent = _price-(_price*(_discount/100));
                        }

                        return(
                        change_box_state===1?
                            <Full data={item} off={percent}/>
                        :
                            change_box_state===2?
                                <Two data={item} off={percent}/>
                            :
                                <Half data={item} off={percent}/>
                    )})
                }
            </View>
        </View>
    )
}




const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f1f1f1'
    },
    A_header_top:{
        width:'100%',
        height:w/10,
        flexDirection:'row',
        elevation:4,
        top:0,
        backgroundColor:'#fff'
    },
    center:{
        alignItems:'center',
        justifyContent:'center',
        height:'100%'
    },
    A_header_top_left:{
        height:'100%',
        width:'10%',
        alignItems:'center',
        justifyContent:'center',
        left:-4
    },
    A_header_top_right:{
        width:'45%', 
        flexDirection:'row'
    },
    border_left_right:{
        borderLeftWidth:0.4,
        borderRightWidth:0.4,
        borderColor:'#666'
    },
    head_icon:{
        fontSize:24,
        color:'#666',
        marginLeft:8
    },
    a_header_h3_text:{
        fontSize:14,
        color:'#444',
        textAlign:'center',
        fontFamily:'IRANSansMobile_Light',
    },
    a_header_h4_text:{
        fontSize:11,
        color:'#999',
        textAlign:'center',
        fontFamily:'IRANSansMobile_Light',
    }
     
})
const full_s = StyleSheet.create({
    box:{
        width:'100%',
        height:w/1.2,
        backgroundColor:'#fff',
        elevation:3,
        borderRadius:3,
        marginBottom:8
    },
    sec1:{
        padding:10,
        width:'100%',
        height:'80%'
    },
    image_box:{
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    image:{
        width:'60%',
        height:'60%',
        resizeMode:'contain'
    },
    pName:{
        fontSize:14,
        color:'#111',
        marginBottom:10,
        marginTop:30,
        fontFamily:'IRANSansMobile_Light',
    },
    eName:{
        fontSize:15,
        color:'#777',
        marginBottom:30,
        textAlign:'right',
        fontFamily:'IRANSansMobile_Light',
    },
    sec2:{
        borderTopWidth:.5,
        borderColor:'#d1d1d1',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    box_price:{
        height:'90%'
    },
    red_p:{
        color:'red',
        textDecorationLine: 'line-through',
        fontSize:17,
        margin:5,
        marginBottom:0,
        fontFamily:'B Nazanin',
    },
    green_p:{
        color:'#5ecf56',
        fontSize:17,
        margin:3,
        fontFamily:'B Nazanin',
    } ,
    s_s_text:{
        fontSize:13,
        color:'#f4f4f4',
        padding:3,
        backgroundColor:'red',
        borderRadius:3,
        margin:3,
        fontFamily:'IRANSansMobile_Light',
    }
})
const half_s = StyleSheet.create({
    box:{
        width:null,
        height:w/2.2,
        backgroundColor:'#fff',
        marginBottom:8,
        elevation:3,
        borderRadius:3,
        flexDirection:'row'
    },
    left:{
        height:'100%',
        width:'70%',
    },
    box_name:{
        width:'100%',
        height:'70%',
    },
    box_price:{
        width:'100%',
        height:'30%',
        flexDirection:'row',
        justifyContent:'space-between',
        borderTopWidth:.5,
        borderColor:'#d1d1d1',
        paddingLeft:6
    },
    right:{
        height:'100%',
        width:'30%',
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:'95%',
        height:'80%',
        resizeMode:'contain'
    }
})
const two_s = StyleSheet.create({
    box:{
        width:'49%',
        height:w/1.8,
        backgroundColor:'#fff',
        elevation:3,
        borderRadius:3,
        marginBottom:8
    },
    sec1:{
        padding:10,
        width:'100%',
        height:'75%'
    },
    image_box:{
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    image:{
        width:'70%',
        height:'80%',
        resizeMode:'contain'
    },
    pName:{
        fontSize:13,
        color:'#111',
        marginBottom:15,
        marginTop:10,
        fontFamily:'IRANSansMobile_Light',
    },
    sec2:{
        width:'100%',
        height:'25%',
        borderTopWidth:.5,
        borderColor:'#d1d1d1',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    box_price:{
        paddingLeft:6
    },
    red_p:{
        color:'red',
        textDecorationLine: 'line-through',
        fontSize:17,
        // margin:5,
        // marginBottom:7,
        fontFamily:'B Nazanin',
        textAlign:'left',
    },
    green_p:{
        color:'#5ecf56',
        fontSize:17,
        // margin:5,
        fontFamily:'B Nazanin',
        textAlign:'left',
    } ,
    s_s_text:{
        fontSize:12,
        color:'#f4f4f4',
        padding:3,
        backgroundColor:'red',
        borderRadius:3,
        margin:5,
        fontFamily:'IRANSansMobile_Light',
    }
})



export default React.memo(Offs);
