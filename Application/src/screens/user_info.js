import React,{useState,useEffect,useContext} from 'react'
import {View,StyleSheet,Text,TextInput,CheckBox,Picker, ToastAndroid} from 'react-native'
import { Container, Content, Body } from 'native-base';
import {useNavigation} from 'react-navigation-hooks'
import { TextInputMask } from 'react-native-masked-text'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';
import states from '../assets/citys/citys.js'
import My_Header from '../components/header/my_header'

import My_Footer from '../components/footer/my_footer'
import {BascketContext} from '../context/Basc/bascketContext'


const User_Info =() => {
    
    const {navigate}=useNavigation();
    const { bascket,emptyBascket } = useContext(BascketContext);
    const [name,SETname]=useState("")
    const [family,SETfamily]=useState("")
    const [phone,SETphone]=useState("")
    const [tell,SETtell]=useState("")
    const [mail,SETmail]=useState("")
    const [cityes,SETcityes]=useState([])
    const [birthday,SETbirthday]=useState("")
    const [men,SETmen]=useState(false)
    const [women,SETwomen]=useState(false)
    const [gender,SETgender]=useState(false)
    const [state_selected,SETstate_selected]=useState("")
    const [city_selected,SETcity_selected]=useState("")
    const [postalCode,SETpostalCode]=useState("")
    const [address,SETaddress]=useState("")
    const [paymentID,SETpaymentID]=useState("")
    const [commentID,SETcommentID]=useState("")
    const [favoriteID,SETfavoriteID]=useState("")
    const [completeInfo,setCompleteInfo] = useState(false);
    const [paylink,setPaylink] = useState('')
    useEffect(()=>{
        async function _getUserData() {
            axios({
                url: '/',
                method: 'post',
                headers:{'token':`${await AsyncStorage.getItem('token')}`},
                data: {
                    query: `
                        query getSelfInfo {
                            getSelfInfo {
                            _id,
                            fname,
                            lname,
                            code,
                            number,
                            birthday,
                            gender,
                            phone,
                            email,
                            password,
                            city,
                            state,
                            address,
                            }
                        }
                    `,
                }
            })
            .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    const {fname, lname, code, number, birthday, gender, phone, email, city, state, address} = response.data.data.getSelfInfo
                    if(lname){
                       
                        SETname(fname)
                        SETfamily(lname)
                        SETpostalCode(code)
                        SETtell(number)
                        SETbirthday(birthday)
                        SETgender(gender)
                        SETphone(phone)
                        SETmail(email)
                        SETcity_selected(city)
                        SETstate_selected(state)
                        SETaddress(address)
                        SETpaymentID(address)
                        SETcommentID(address)
                        SETfavoriteID(address)
                    }
                    else{
                        SETname(fname);
                        SETphone(phone);
                        setCompleteInfo(true)
                    }
                    
                }
            })
            .catch(function (error) {
                alert(JSON.stringify('err '+error))
            });
        }

        _getUserData()
    },[])

    _buy = () => {
        async function _setUserData() {
            const token = await AsyncStorage.getItem('token');
            axios({
                url: '/',
                method: 'post',
                headers:{'token':token},
                data: {
                    query: `
                    mutation UpdateSelfInfo($fname : String, $lname : String, $code : String, $number : String, $email : String, $birthday : String, $gender : Gender, $state : String, $city : String, $address : String) {
                        UpdateSelfInfo(input : {fname : $fname, lname : $lname, code : $code, number : $number, birthday : $birthday, gender : $gender, email : $email, city : $city, state : $state , address : $address}) {
                          status,
                          message
                        }
                      }
                    `,
                    variables : {
                        "fname": name,
                        "lname": family,
                        "number": tell,
                        "code": postalCode,
                        "city": city_selected,
                        "state": state_selected,
                        "address": address,
                        "email": mail,
                        "birthday": birthday,
                        "gender": gender
                    }
                }
                })
            .then(function (response) {
                if(response.data.errors){
                    alert('خطا در ثبت اطلاعات')
                }
                else{
                    // alert('داده با موفقیت ثبت شد')
                    const {status} = response.data.data.UpdateSelfInfo
                     if(status==200){
                        
                        const products =[];
                        const attributes = [];
                        const discount = 0;
                        const count = bascket.length;
                        bascket.map((item)=>{
                            products.push(item.productId);
                            attributes.push(item.attributeId);
                        })

                        console.log(products);
                        console.log(attributes);
                        console.log(discount);
                        console.log(count);
                        axios({
                            url: '/',
                            method: 'post',
                            headers:{'token':token},
                            data: {
                                query: `
                                mutation payment($products : [ID!]!, $attributes : [ID!]!,$count : Int = 1, $discount : Int = 0, $receptor : ID) {
                                    payment(input : {products : $products, attributes : $attributes, count : $count, discount : $discount, receptor : $receptor}) {
                                      payLink,
                                      status
                                    }
                                  }
                                `,
                                variables : {
                                    "products": products,
                                    "attributes": attributes,
                                    "count" : count,
                                    "discount" : discount,
                                    "receptor": null
                                  }
                                 }
                            }).then((response)=>{
                                    if(response.data.errors){
                                        const {message} = response.data.errors[0];
                                        ToastAndroid.showWithGravityAndOffset(
                                            message,
                                            ToastAndroid.LONG,
                                            ToastAndroid.BOTTOM,
                                            25,
                                            50,
                                          );
                                    }
                                    else{
                                       const {payLink} =   response.data.data.payment;
                                       setPaylink(payLink);
                                       ToastAndroid.showWithGravityAndOffset(
                                        'در حال انتقال به درگاه پرداخت',
                                        ToastAndroid.LONG,
                                        ToastAndroid.BOTTOM,
                                        25,
                                        50,
                                      );
                                    }
                            }).catch((error)=>{
                                    console.log(error)
                            })





                     }
                     else{
                         alert('خطا در ثبت سفارش')
                     }
                }
            })
            .catch(function (error) {
                alert(JSON.stringify('err '+error))
            });
        }

        _setUserData();
        //navigate('Payment')
    }


    const _state_selective = (e) => {
        SETstate_selected(e);
        const newData = states.filter((item)=>{
            return item.name == e
        })
        SETcityes(newData[0].cities)
        // alert(JSON.stringify(newData[0].cities))
    }

    const _city_selective =(e) => {
        SETcity_selected(e)
    }

    const _nameHandler = (e) => {
        SETname(e)
    }

    const _familyHandler = (e) => {
        SETfamily(e)
    }

    const _phoneHandler = (e) => {
        SETphone(e)
    }

    const _tellHandler  = (e) => {
        SETtell(e)
    }

    const _emailHandler = (e) => {
        SETmail(e)
    }

    const _birthdayHandler = (e) => {
        SETbirthday(e)
    }

    const _menHandler = (e) => {
        if(women){
            SETwomen(false)
        }
        SETmen(e);
        SETgender("Male")
    }

    const _womenHandler = (e) => {
        if(men){
            SETmen(false)
        }
        SETwomen(e)
        SETgender("Famale")
    }

    const _postalCodeHandler = (e) => {
        SETpostalCode(e)
    }

    const _addressHandler = (e) => {
        SETaddress(e)
    }

    let props = {
        head_name:'Cart',
    }

    return(
        <Container style={{backgroundColor:'#eee'}}>
                {
                    paylink !=='' ? 
                    <WebView 
                        source={{ uri: paylink }}
                        style={{flex:1}}
                        onNavigationStateChange={data =>
                            {
                                const route = data.url.replace(/.*?:\/\//g, '');
                                const id = route.split('/')[1];
                                const routeName = route.split('/')[4];
                               
                                if(routeName)
                                {
                                    const status = routeName.split('=')[2];
                                    if(status =='NOK')
                                    {

                                      setPaylink('');
                                      navigate('Shop_cart')
                                       ToastAndroid.show(
                                        'پرداخت شما لغو گردید',
                                        ToastAndroid.LONG,
                                        ToastAndroid.BOTTOM,
                                      );
                                        
                                    }
                                    else if (status =='OK'){
                                        setPaylink('');
                                        navigate('Main');
                                        emptyBascket();
                                       ToastAndroid.show(
                                        'پرداخت شما  با موفقیت انجام شد',
                                        ToastAndroid.LONG,
                                        ToastAndroid.BOTTOM,
                                      );
                                    }
                                }
                                
                            }
                            
                        }
                      />:
                    <React.Fragment>
                    <My_Header {...props}/>
                    <Content style={styles.container}>
                        
                        <View style={styles.view}>
                            <Text style={styles.text}> نام</Text>
                            <TextInput 
                               
                                style={[styles.textIn]}
                                value={name}
                                onChangeText={(e)=>_nameHandler(e)}
                            />
                        </View>
        
                        <View style={styles.view}>
                            <Text style={styles.text}> نام خانوادگی</Text>
                            <TextInput 
                                value={family}
                                style={[styles.textIn]}
                                onChangeText={(e)=>_familyHandler(e)}
                            />
                        </View>
        
                        <View style={styles.view}>
                            <Text style={styles.text}>شماره همراه</Text>
                            <TextInput
                                value={phone} 
                                editable={phone ? false : true}
                                style={[styles.textIn]}
                                onChangeText={(e)=>_phoneHandler(e)}
                            />
                        </View>
        
                        <View style={styles.view}>
                            <Text style={styles.text}>شماره تلفن ثابت</Text>
                            <TextInput 
                                value={tell}
                                style={[styles.textIn]}
                                onChangeText={(e)=>_tellHandler(e)}
                            />
                        </View>
        
                        <View style={styles.view}>
                            <Text style={styles.text}>ایمیل</Text>
                            <TextInput 
                                value={mail}
                                style={[styles.textIn]}
                                onChangeText={(e)=>_emailHandler(e)}
                            />
                        </View>
        
                        <View style={styles.view}>
                            <Text style={styles.text}>تاریخ تولد</Text>
                            <TextInputMask
                                type={'datetime'}
                                placeholder={"1360/12/1"}
                                options={{
                                    format: 'YYYY/MM/DD'
                                }}
        
                                // dont forget to set the "value" and "onChangeText" props
                                value={birthday}
                                onChangeText={_birthdayHandler}
                                style={styles.textIn}
                            />
                        </View>
        
                        <View style={styles.view}>
                            <Text style={styles.text}>جنسیت</Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text>مرد</Text>
                                <CheckBox
                                    onValueChange={(e)=>_menHandler(e)}
                                    value={gender== "Male"?true:false}
                                    
                                />
                                <Text>زن</Text>
                                <CheckBox
                                    onValueChange={(e)=>_womenHandler(e)}
                                    value={gender=="Famale"?true:false}
                                    
                                />
                            </View>
                        </View>
        
                        <View style={styles.view}>
                            <Text style={styles.text}>استان</Text>
                            <Picker
                                selectedValue={state_selected}
                                style={styles.picher}
                                onValueChange={_state_selective}
                            >
                                <Picker.Item label={state_selected || "استان خود را انتخاب کنید"}/>
                                {
                                    states.map((item,index)=>(
                                        <Picker.Item label={item.name} value={item.name} key={index}/>
                                    ))
                                }
                            </Picker>
                        </View>
        
                        <View style={styles.view}>
                            <Text style={styles.text}>شهر</Text>
                            <Picker
                                selectedValue={city_selected}
                                style={styles.picher}
                                onValueChange={_city_selective}
                            >
                                       
                                {
                                    cityes.length==0?
                                        <Picker.Item label={ city_selected || "ابتدا استان خود را انتخاب کنید"}/>
                                    :
                                        cityes.map((item,index)=>(
                                            <Picker.Item label={item.name} value={item.name} key={index}/>
                                        ))
                                }
                            </Picker>
                        </View>
        
                        <View style={styles.view}>
                            <Text style={styles.text}> کد پستی</Text>
                            <TextInput 
                                style={[styles.textIn]}
                               
                                value={postalCode}
                                onChangeText={(e)=>_postalCodeHandler(e)}
                            />
                        </View>
        
                        <View style={styles.view}>
                                <Text style={styles.text}>آدرس *</Text>
                                <TextInput 
                                    scrollEnabled
                                    
                                    value={address}
                                    style={[styles.textIn]}
                                    onChangeText={(e)=>_addressHandler(e)}
                                />
                            </View>
        
                    </Content>
                    <My_Footer name={'ثبت نهایی'} onLogin={_buy}/>
                    </React.Fragment>
                }
           
        </Container>
    )
}

const styles=StyleSheet.create({
    view:{
        margin:8,
        alignItems:"flex-end",
    },
    textIn:{
        width:'100%',
        height:45,
        backgroundColor:'#fff',
        textAlign:'right'
    },
    text:{
        flex:1,
        marginTop:10,
        marginBottom:5,
        marginRight:15,
    },
    picher:{
        height: 35,
        width: '100%',
        backgroundColor:'#fff',
    }
})

export default React.memo(User_Info)