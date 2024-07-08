import { ActivityIndicator, View } from '@ant-design/react-native'
import React from 'react'

const CustomLoader = () => {
  return (
    <View>
        <ActivityIndicator text="Loading..." />
    </View>
  )
}

export default CustomLoader