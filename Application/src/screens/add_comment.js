import React,{useState,useEffect} from 'react'
import {View,StyleSheet,Text} from 'react-native'
import { Container, Content } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from 'react-navigation-hooks'
import axios from 'axios'
import Stars from 'react-native-stars'

import My_Header from '../components/header/my_header'
import Rait_sq from '../components/common/rait_sq'
import Send_Co from '../components/add_comment_page/send_co'
import My_Footer from '../components/footer/my_footer'
import rating from '../components/comment_page/rating';

const props ={
    head_name:'Cat',
    name_page:'ثبت نقد و برسی'
}

const Add_Comment =() => {

    const {getParam}=useNavigation();
    const c_id = getParam('c_id')
    const p_id = getParam('p_id')

    const [loading,SETloading]=useState(false)
    const [rating_data,SETrating_data]=useState([])
    const [surveyId,SETsurveyId]=useState([])
    const [surveyValue,SETsurveyValue]=useState([])

    const [title,SETtitle]=useState("")
    const [positive,SETpositive]=useState("")
    const [negetive,SETnegetive]=useState("")
    const [disc,SETdisc]=useState("")
    
    const [positiveArr,SETpositiveArr]=useState([])
    const [negetiveArr,SETnegetiveArr]=useState([])

    useEffect(()=>{
        async function _getRatingData() {
            axios({
                url: '/',
                method: 'post',
                data: {
                    query: `
                        query getAllSurvey ($categoryId : ID!){
                            getAllSurvey(categoryId : $categoryId) {       
                                _id,
                                name
                            }
                        }    
                    `, 
                    variables : {
                        "categoryId": c_id
                    }
                }
                })
            .then(function (response) {
                if(response.data.errors){
                    alert(response.data.errors[0].message)
                }
                else{
                    const {getAllSurvey} = response.data.data;
                    getAllSurvey.map((item)=>{
                        item.value = 3
                    })
                    SETrating_data(getAllSurvey);
                    // alert(JSON.stringify(getAllSurvey))
                    // alert(JSON.stringify(getAllSurvey))
                    // console.log(response.data.data.getAllSurvey)
                }
            })
            .catch(function (error) {
                    alert(JSON.stringify('err '+error))
            });
        }

        _getRatingData()
    },[])

    const _add_comment = async()=>{
        SETloading(true);
        const arrayHolder = [];
        rating_data.map((item)=>{
            arrayHolder.push({
                "survey":item._id,
                "value":parseFloat(item.value)
            })
        })
        axios({
            url: '/',
            method: 'post',
            headers:{'token':`${await AsyncStorage.getItem('token')}`},
            data: {
                query: `
                mutation addComment($product : ID!, $survey : [InputSurveyValue!]!, $title : String!, $description : String!, $negative : [String], $positive : [String]){
                    comment(input : {product : $product, survey : $survey, title : $title, description : $description, negative : $negative, positive : $positive}) {
                      status,
                      message
                    }
                  }
                `, 
                variables : {
                    "product": p_id,
                    "survey": arrayHolder,
                    "title": title,
                    "description": disc,
                    "negative": negetiveArr,
                    "positive": positiveArr
                }
            }
            })
            .then(function (response) {
                if(response.data.errors){
                    // alert(response.data.errors[0].message)
                }
                else{
                    // setDataList(response.data.data.getProduct)
                    alert('کامنت شما به درستی ثبت شد')
                }
            })
            .catch(function (error) {
                    alert(JSON.stringify(error))
            });
    }
    
    const _updateValue = (val,index)=>{
        const newRatingData = [...rating_data];
        newRatingData[index].value=val;
        SETrating_data(newRatingData);
    }
         
    const _title= (event)=>{
        SETtitle(event)
    }
    const _positive= (event)=>{
        SETpositive(event)
    }
    const _negetive= (event)=>{
        SETnegetive(event)
    }
    const _disc= (event)=>{
        SETdisc(event)
    }
    const _addPosetiveItem = () => {
        const newPosetiveItems = [...positiveArr];
        newPosetiveItems.push(positive)
        SETpositiveArr(newPosetiveItems);
        SETpositive("")
    }
    const _addNegetiveItem = () => {
        const newNegetiveItems = [...negetiveArr];
        newNegetiveItems.push(negetive)
        SETnegetiveArr(newNegetiveItems);
        SETnegetive("")
    }

    return(
        <Container style={{backgroundColor:'#eee'}}>
            <My_Header {...props}/>

            <Content style={{padding:5}}>
                <Text style={styles.reting_text}>امتیاز شما به این محصول</Text>

                <View style={styles.reting_view}>
                    <View style={[styles.sec2,]}>
                        {
                            rating_data.map((item,index)=>(
                                <View style={styles.sec2_part} key={item._id}>
                                    <Stars
                                        half={true}
                                        default={item.value}
                                        spacing={2}
                                        starSizeW={43}
                                        starSizeH={7}
                                        update={(val)=>_updateValue(val,index)}
                                        count={5}
                                        fullStar={require('../assets/img/full_sq.png')}
                                        emptyStar={require('../assets/img/empty_sq.png')}
                                        halfStar={require('../assets/img/half_sq_c.png')}
                                    />
                                    <Text style={[styles.text_size11,styles.text_color_gray]}>
                                        {item.name}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
                
                <Send_Co 
                    usertitleHandler={(e)=>_title(e)}
                    userpositiveHandler={(e)=>_positive(e)}
                    usernegetiveHandler={(e)=>_negetive(e)}
                    userdiscHandler={(e)=>_disc(e)}
                    _addPosetiveItem={_addPosetiveItem}
                    positiveArr={positiveArr}
                    positive={positive}
                    _addNegetiveItem={_addNegetiveItem}
                    negetiveArr={negetiveArr}
                    negetive={negetive}
                />
            </Content>

            <My_Footer name={'ثبت نقد و برسی'} onLogin={_add_comment}/>
        </Container>
    )
}

const styles=StyleSheet.create({
    reting_text:{
        fontSize:16,
        fontFamily:'IRANSansMobile_Light',
        color:'#666',
        marginBottom:15,
        marginTop:10
    },
    reting_view:{
        backgroundColor:'#fff',
        padding:5,
        marginRight:5,
        marginLeft:5
    },
    sec2_part:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop: 8
    },
    text_size11:{
        fontSize:10,
        marginLeft:5,
        fontFamily:'IRANSansMobile_Light',
        textAlign:'right',
    },
    text_color_gray:{
        color:'#888'
    },
})
export default React.memo(Add_Comment)