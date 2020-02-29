import React from 'react'
import {Image,StyleSheet,Dimensions} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {off_list} from '../../data/dataArray'
import {useNavigation} from 'react-navigation-hooks'

const w = Dimensions.get('window').width;

const Off = () => {
    const { navigate } = useNavigation();
    return(
        <Ripple style={styles.container} onPress={()=>navigate('Off')}>
            {
                off_list.map((item,key)=>(
                    <Image
                        key={key}
                        style={styles.img}
                        source={{uri:item.img}}
                    />
                ))
            }
        </Ripple>
    )
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height: w/3.2,
        marginTop:15,
        marginBottom:10
    },
    img:{
        width:'100%',
        height:'100%'
    }
})

export default React.memo(Off);