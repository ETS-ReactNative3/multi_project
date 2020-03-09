import React,{useState,useEffect} from 'react'
import {View,StyleSheet,Text,TextInput,CheckBox,Picker,TouchableOpacity} from 'react-native'
import { Container, Content, Body } from 'native-base';
import {useNavigation} from 'react-navigation-hooks'
import { TextInputMask } from 'react-native-masked-text'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

import states from '../assets/citys/citys.js'
import My_Header from '../components/header/my_header'
import Rait_sq from '../components/common/rait_sq'
import Send_Co from '../components/add_comment_page/send_co'
import My_Footer from '../components/footer/my_footer'

const User_Info =() => {
    
    const {navigate}=useNavigation();
    
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
                            payment {
                                _id
                            },
                            comment {
                                _id
                            },
                            favorite {
                                _id
                            }
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
                    SETname(response.data.data.getSelfInfo.fname)
                    SETfamily(response.data.data.getSelfInfo.lname)
                    SETpostalCode(response.data.data.getSelfInfo.code)
                    SETtell(response.data.data.getSelfInfo.number)
                    SETbirthday(response.data.data.getSelfInfo.birthday)
                    SETgender(response.data.data.getSelfInfo.gender)
                    SETphone(response.data.data.getSelfInfo.phone)
                    SETmail(response.data.data.getSelfInfo.email)
                    SETcity_selected(response.data.data.getSelfInfo.city)
                    SETstate_selected(response.data.data.getSelfInfo.state)
                    SETaddress(response.data.data.getSelfInfo.address)
                    SETpaymentID(response.data.data.getSelfInfo.address)
                    SETcommentID(response.data.data.getSelfInfo.address)
                    SETfavoriteID(response.data.data.getSelfInfo.address)
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
                                payment {
                                    _id
                                },
                                comment {
                                    _id
                                },
                                favorite {
                                    _id
                                }
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
                        "gender": men || women
                    }
                }
                })
            .then(function (response) {
                if(response.data.errors){
                    alert('خطا در ثبت اطلاعات')
                }
                else{
                    // alert('داده با موفقیت ثبت شد')
                    // alert(JSON.stringify(response.data.data))
                }
            })
            .catch(function (error) {
                alert(JSON.stringify('err '+error))
            });
        }

        _setUserData();
        navigate('Payment')
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
        SETmen(e)
    }

    const _womenHandler = (e) => {
        if(men){
            SETmen(false)
        }
        SETwomen(e)
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
            <My_Header {...props}/>
            <Content style={styles.container}>

                <View style={styles.view}>
                    <Text style={styles.text}> نام</Text>
                    <TextInput 
                        editable={name?false:true}
                        style={[styles.textIn]}
                        value={name}
                        onChangeText={(e)=>_nameHandler(e)}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}> نام خانوادگی</Text>
                    <TextInput 
                        editable={family?false:true}
                        value={family}
                        style={[styles.textIn]}
                        onChangeText={(e)=>_familyHandler(e)}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>شماره تلفن ثابت</Text>
                    <TextInput
                        value={phone} 
                        editable={phone?false:true}
                        style={[styles.textIn]}
                        onChangeText={(e)=>_phoneHandler(e)}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>شماره همراه</Text>
                    <TextInput 
                        value={tell}
                        editable={tell?false:true}
                        style={[styles.textIn]}
                        onChangeText={(e)=>_tellHandler(e)}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>ایمیل</Text>
                    <TextInput 
                        value={mail}
                        editable={mail?false:true}
                        style={[styles.textIn]}
                        onChangeText={(e)=>_emailHandler(e)}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>تاریخ تولد</Text>
                    <TextInputMask
                        type={'datetime'}
                        editable={birthday?false:true}
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
                            value={gender=="Male"?true:men}
                            disabled={gender?true:false}
                        />
                        <Text>زن</Text>
                        <CheckBox
                            onValueChange={(e)=>_womenHandler(e)}
                            value={gender!="Male"?true:women}
                            disabled={gender?true:false}
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
                        editable={postalCode?false:true}
                        value={postalCode}
                        onChangeText={(e)=>_postalCodeHandler(e)}
                    />
                </View>

                <View style={styles.view}>
                        <Text style={styles.text}>آدرس *</Text>
                        <TextInput 
                            scrollEnabled
                            editable={address?false:true}
                            value={address}
                            style={[styles.textIn]}
                            onChangeText={(e)=>_addressHandler(e)}
                        />
                    </View>

            </Content>
            <My_Footer name={'ثبت نهایی'} onLogin={_buy}/>
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