import { Icon } from '@ant-design/react-native'
import React from 'react'
import { Text, View } from 'react-native'
import { primary } from '../../utils/colors'
import { SearchBar } from 'react-native-screens'


interface AppBarProps{
    title: string,
    children?: React.ReactNode
}

const AppBar = (props:AppBarProps) => {
  return (
    <View style={{height: 50, backgroundColor: primary, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={{marginLeft: 16}}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>{props.title}</Text>
      </View>
      <View>
        {props.children}
      </View>
    </View>
    

  )
}

export default AppBar