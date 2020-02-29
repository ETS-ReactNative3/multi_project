import React from 'react'
import {View} from 'react-native'

import My_Header from '../components/header/my_header'

const Search =() => {
    return(
        <View style={{backgroundColor:'#f3f3f3',flex:1}}>
            <My_Header head_name={'Search'}/>
        </View>
    )
}

export default React.memo(Search)