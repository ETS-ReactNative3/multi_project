import React from 'react'
import {View,Text,StyleSheet,FlatList,Image,Dimensions} from 'react-native'
import {cat_item} from '../../data/dataArray'
import Ripple from 'react-native-material-ripple'
const w = Dimensions.get('window').width;

const KalaThree = () => {
    return(
        <View>
            <View style={styles.head}>
                <Text style={styles.head_right}>
                    فروش ویژه
                </Text>
            </View>
            <FlatList 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={cat_item}
                renderItem={({item,index})=>
                    <Ripple style={styles.flatlist_style}>
                        <Image 
                            style={styles.img}
                            source={{uri:item.img}}
                        />
                        <View style={styles.view_name}>
                            <Text style={styles.text_name}>
                                {item.name}
                            </Text>
                        </View>
                        <View style={styles.view_price}>
                            <Text style={styles.text_price}>
                                تومان {item.price}
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
        padding:10
    },
    head_right:{
        fontSize:18,
        fontWeight:'bold'
    },
    flatlist_style:{
        backgroundColor:'#fff',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:w/3,
        height:w/2,
        marginLeft:10,
        marginRight:10,
        marginBottom:8,
        borderRadius:5
    },
    img:{
        width:'90%',
        height:'60%',
        resizeMode:'contain'
    },
    view_name:{
        marginTop:15,
        padding:5
    },
    text_name:{
        fontSize:16
    },
    view_price:{
        borderTopWidth:0.5,
        padding:5
    },
    text_price:{
        color:'#14dc17'
    }
})

export default React.memo(KalaThree);