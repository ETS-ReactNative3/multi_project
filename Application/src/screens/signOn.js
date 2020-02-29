import React,{useEffect,useContext,useState} from 'react'
import {View} from 'react-native'
import {Content,Container} from 'native-base'
import axios from 'axios'
import {useNavigation} from 'react-navigation-hooks'

import My_Header from '../components/header/my_header'
import Body from '../components/signOn_page/content'
import My_Footer from '../components/footer/my_footer'
import {AuthContext} from '../context/Auth/authContext'
import Login from './Login'

let props ={
    head_name:'Login',
    head_page_name:'ثبت نام'
}


const SignOn =() => {
    const {navigate} = useNavigation();

    const {dispatch} = useContext(AuthContext);

    const [usernum,setUsernum]=useState()
    const [userpass,setUserpass]=useState()


    const onLogin = ()=>{
        if(usernum==null){
            alert('شماره موبایل خود را وارد کنید')
        }
        else if(userpass==null){
            alert('پسورد خود را وارد کنید')
        }
        else{
            axios({
                url: '/',
                method: 'post',
                data: {
                  query: `
                  mutation {
                    register(input : { phone : "${usernum}", password : "${userpass}"}) {
                        status,
                        message
                    }
                  }
                    `
                }
                })
              .then(function (response) {
                console.log(response.data.data.register.message);
                navigate('Login',{num:usernum,pass:userpass})
              })
              .catch(function (error) {
                console.log('+'+ error);
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
            <Content>
                <Body
                    userpassHandler={(e)=>userpassHandler(e)}
                    usernameHandler={(e)=>usernameHandler(e)}                
                 />
            </Content>
            <My_Footer color={'green'} onLogin={onLogin}/>
        </Container>
    )
}

export default React.memo(SignOn)