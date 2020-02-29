import React from 'react'
import {View,Text,StyleSheet,FlatList,Image,Dimensions} from 'react-native'
import {kala} from '../../data/dataArray'
import Ripple from 'react-native-material-ripple'
import {useNavigation} from 'react-navigation-hooks'

const w = Dimensions.get('window').width;

const KalaOne = () => {
    const { navigate } = useNavigation();
    return(
        <View>
            <View style={styles.head}>
                <Text style={styles.head_left}>
                    لیست کامل
                </Text>
                <Text style={styles.head_right}>
                    محصولات پر فروش
                </Text>
            </View>
            <FlatList 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={kala}
                renderItem={({item,index})=>
                    <Ripple style={styles.box} onPress={()=>navigate('Kala',{header_name:item.pname})}>
                        <View style={styles.view_img}>
                            <Image 
                                style={styles.img}
                                source={{uri:item.img}}
                            />
                        </View>
                        <View style={styles.view_name}>
                            <Text style={styles.text_name}>
                                {item.pname}
                            </Text>
                        </View>
                        <View style={styles.view_price}>
                            <Text style={styles.text_price}>
                                 {item.price} تومان
                            </Text>
                        </View>
                    </Ripple>
                }
            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    head:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10
    },
    head_left:{
        color:'#0052cc',
        fontSize:13,
        fontFamily:'IRANSansMobile_Light'
    },
    head_right:{
        fontSize:16,
        color:'#666',
        fontWeight:'bold',
        fontFamily:'IRANSansMobile'
    },
    box:{
        backgroundColor:'#fff',
        flexDirection:'column',
        width:w/2.8,
        height:w/1.8,
        marginLeft:3,
        marginRight:5,
        marginBottom:8,
        borderRadius:2,
        borderColor:'#ddd',
        borderWidth:0.5
    },
    view_img:{
        width:'100%',
        height:'65%',
        alignItems:'center',
        justifyContent:'center'
    },
    img:{
        width:'90%',
        height:'100%',
        resizeMode:'contain'
    },
    view_name:{
        height:'20%',
        padding:5,
    },
    text_name:{
        fontSize:12,
        color:'#333',
        textAlign:'right',
        fontFamily:'IRANSansMobile_Light'
    },
    view_price:{
        height:'15%',
        borderTopWidth:0.4,
        borderColor:'#eee',
        justifyContent:'center',
        paddingLeft:5
    },
    text_price:{
        color:'#14dc17',
        fontSize:14,
        textAlign:'left',
        fontFamily:'B Nazanin',
    }
})

export default React.memo(KalaOne);