import React ,{useEffect, useState,useContext}from 'react'
import {View,AsyncStorage} from 'react-native'
import {Content,Container} from 'native-base'
import {useNavigation} from 'react-navigation-hooks'
import axios from 'axios'

import Loader from '../components/common/loader'
import {AuthContext} from '../context/Auth/authContext'
import My_Header from '../components/header/my_header'
import Body from '../components/login_page/body'
import My_Footer from '../components/footer/my_footer'

let props ={
    head_name:'Login',
    head_page_name:'ورود'
}



const Login =() => {

    const {getParam,navigate}=useNavigation();
    // const num=getParam('num')
    // const pass=getParam('pass')

    const {dispatch,authReducer} = useContext(AuthContext);

    const [usernum,setUsernum]=useState()
    const [userpass,setUserpass]=useState()
    const [loading,SETloading]=useState(false)

    const onLogin = ()=>{
        SETloading(true);
        if(usernum==null){
            SETloading(false);
            alert('شماره موبایل خود را وارد کنید')
        }
        else if(userpass==null){
            SETloading(false);
            alert('پسورد خود را وارد کنید')
        }
        else{
            axios({
                url: '/',
                method: 'post',
                data: {
                  query: `
                  query {
                    login(input : { phone : "${usernum}", password : "${userpass}"}){
                        token
                    }
                  }
                    `
                }
                })
              .then(function (response) {
                if(response.data.errors){
                    SETisLoading(false);
                    alert(response.data.errors[0].message)
                }
                else{
                    //--------save token in context-----------
                    dispatch({type:'login',payload:response.data.data.login.token});
                    navigate('Main')
                }
              })
              .catch(function (error) {
                SETloading(false);
                alert('مشکل در برقراری ارتبا با سرور');
            });
        }
    }
    
    const usernameHandler= (event)=>{
        setUsernum(event)
    }

    const userpassHandler= (event)=>{
        setUserpass(event)
    }

    return(
        <Container style={{backgroundColor:'#f3f3f3',}}>
            <My_Header {...props} />
            {
                loading?
                    <Loader/>
                :
                    <Content>
                        <Body 
                            userpassHandler={(e)=>userpassHandler(e)}
                            usernameHandler={(e)=>usernameHandler(e)}  
                        />
                    </Content>
            }
            <My_Footer onLogin={onLogin}/>
        </Container>
    )
}

export default React.memo(Login)