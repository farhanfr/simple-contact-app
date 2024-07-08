import { ActivityIndicator, Button, Card, Icon, ListView } from '@ant-design/react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native'
import AppBar from '../../components/AppBar'
import { IContact, IResponseFetchContacts } from '../../data/contact'
import { fetchAllContacts } from '../../services/contact_service'
import CustomLoader from '../../components/CustomLoader'
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { ADD_CONTACT_ROUTE, DETAIL_CONTACT_ROUTE } from '../../utils/route'

const ListContactScreen = () => {

  const navigation = useNavigation()

  const [contactData, setContactData] = useState<IContact[]>([])
  const [loading, setLoading] = useState<boolean>(false)


  const handleGetContacts = async () => {
    setLoading(true)
    await fetchAllContacts().then(res => {
      setContactData(res.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      handleGetContacts()
      return () => {
        // This function will be called when the screen goes out of focus
        // You can perform any necessary cleanup here
        // ...
      };
    }, []))

  useEffect(() => {
    handleGetContacts()
  }, [])

  const renderItem = (index: number, data:IContact) => {
    return (
      <TouchableOpacity  key={index} onPress={()=>{
        navigation.navigate(DETAIL_CONTACT_ROUTE,{
          id:data.id
         });
      }}>
      <Card full>
        <Card.Body>
          <View style={{ height: 42 }}>
            <Text style={{ marginLeft: 16 }}>{data.firstName}</Text>
          </View>
        </Card.Body>
        <Card.Footer content="footer content" extra="footer extra content" />
      </Card>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <AppBar title='List Contact' children={
        <View style={{marginRight: 16}}>
          <Icon name="plus" color='#fff' size={25} onPress={()=>{
           navigation.navigate(ADD_CONTACT_ROUTE as never);
          }}/>
        </View>
      } />
      <ScrollView>
        {
          loading ?
          <CustomLoader/>
          :
          contactData.map((value, index) => {
            return (
              renderItem(index,value)
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default ListContactScreen