import React,{useState,useEffect} from 'react'
import {View,StyleSheet,Text,TextInput,CheckBox,Picker,TouchableOpacity} from 'react-native'
import { Container, Content } from 'native-base';
import {useNavigation} from 'react-navigation-hooks'
import { TextInputMask } from 'react-native-masked-text'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

import states from '../assets/citys/citys.js'
import My_Header from '../components/header/my_header'
import Rait_sq from '../components/common/rait_sq'
import Send_Co from '../components/add_comment_page/send_co'
import My_Footer from '../components/footer/my_footer'

const Payment =() => {

    const _payment = () => {
        async function _setpaymentData() {
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
                        "products": ["5e5cb775caa7700013b6fb3d", "5e4e2dd63fbf17251474119a"],
                        "attributes": ["5e5cb775caa7700013b6fb3c", "5e4e2dd53fbf172514741199"],
                        "count" : 2,
                        "discount" : 25,
                        "receptor": null
                      }
                }
                })
            .then(function (response) {
                if(response.data.errors){
                    alert('خطا در ثبت اطلاعات')
                }
                else{
                    alert('داده با موفقیت ثبت شد')
                    // alert(JSON.stringify(response.data.data))
                }
            })
            .catch(function (error) {
                alert(JSON.stringify('err '+error))
            });
        }

        _setpaymentData()
    }


    return(
       <></>
    )
}

const styles=StyleSheet.create({
    
})

export default React.memo(Payment)