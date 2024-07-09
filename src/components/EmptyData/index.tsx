import React from 'react'
import { Text, View } from 'react-native'

interface EmptyDataProps {
    title:string,
    description:string
}

const EmptyData = (props:EmptyDataProps) => {
    return (
        <View>
            <Text style={{ textAlign: 'center', marginTop: 100, fontWeight: 'bold', fontSize: 18 }}>{props.title}</Text>
            <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: '300', fontSize: 18 }}>{props.description}</Text>
        </View>
    )
}

export default EmptyData