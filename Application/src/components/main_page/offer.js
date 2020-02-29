import React from 'react'
import {View,Image,StyleSheet,Dimensions} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {offer_list} from '../../data/dataArray'
import {off_list} from '../../data/dataArray'
import {useNavigation} from 'react-navigation-hooks'

const w = Dimensions.get('window').width;


console.log(off_list.length)

const Content = (props) => {
    
    console.log(props.dataKey)
    if(off_list.length==2){
        return(
            <Ripple style={styles.two_box} onPress={()=>navigate('Off',{header_name:item.pname})}>
                <Image 
                    style={styles.img}
                    source={{uri:props.data.img}}
                />
            </Ripple>
        )
    }
    else if(off_list.length==5){
        if(props.dataKey==2){
            return(
                <Ripple style={styles.one_box} onPress={()=>navigate('Off',{header_name:item.pname})}>
                    <Image 
                        style={styles.img}
                        source={{uri:props.data.img}}
                    />
                </Ripple>
            )
        }else{
            return(
                <Ripple style={styles.two_box} onPress={()=>navigate('Off',{header_name:item.pname})}>
                    <Image 
                        style={styles.img}
                        source={{uri:props.data.img}}
                    />
                </Ripple>
            )
        }
    }
    else if(off_list.length==7)
    {
        if(props.dataKey==0 || props.dataKey==6){
            return(
                <Ripple style={styles.btn_full} onPress={()=>navigate('Off',{header_name:item.pname})}>
                    <Image 
                        style={styles.btn_full_img}
                        source={{uri:props.data.img}}
                    />
                </Ripple>
            )
        }
        else if(props.dataKey==3){
            return(
                <Ripple style={styles.one_box} onPress={()=>navigate('Off',{header_name:item.pname})}>
                    <Image 
                        style={styles.img}
                        source={{uri:props.data.img}}
                    />
                </Ripple>
            )
        }
        else{
            return(
                <Ripple style={styles.two_box} onPress={()=>navigate('Off',{header_name:item.pname})}>
                    <Image 
                        style={styles.img}
                        source={{uri:props.data.img}}
                    />
                </Ripple>
            )
        }
    }
}




const Offer = () => {
    const { navigate } = useNavigation();
    return(
        <>
            <View style={styles.container}>
                {
                    off_list.map((item,key)=>(
                        <Content data={item} dataKey={key}/>
                    ))
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around'
    },
    one_box:{
        width:'97%',
        height:w/3.7,
        borderRadius:10,
    },
    two_box:{
        width:'47%',
        height:w/3.7,
        marginTop:15,
        marginBottom:15,
        borderRadius:10
    },
    img:{
        width:'100%',
        height:'100%',
        borderRadius:10
    },
    btn_full:{
        width:'100%',
        height: w/3.2,
        marginTop:15,
        marginBottom:10
    },
    btn_full_img:{
        width:'100%',
        height:'100%'
    }
})


export default React.memo(Offer);