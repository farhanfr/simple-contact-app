import { ActivityIndicator, Button, Card, Icon, ListView } from '@ant-design/react-native'
import React, { useEffect, useState } from 'react'
import { Image, RefreshControl, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native'
import AppBar from '../../components/AppBar'
import { IContact, IResponseFetchContacts } from '../../data/contact'
import { fetchAllContacts } from '../../services/contact_service'
import CustomLoader from '../../components/CustomLoader'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ADD_CONTACT_ROUTE, DETAIL_CONTACT_ROUTE } from '../../utils/route'
import { IMG_DUMMY } from '../../utils/constant'
import { validateImg } from '../../utils/extensions'
import EmptyData from '../../components/EmptyData'

const ListContactScreen = () => {

  const navigation = useNavigation()

  const [contactData, setContactData] = useState<IContact[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = React.useState(false);


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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleGetContacts()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);



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

  const renderItem = (index: number, data: IContact) => {
    return (
      <TouchableOpacity key={index} onPress={() => {
        navigation.navigate(DETAIL_CONTACT_ROUTE, {
          id: data.id
        });
      }}>
        <Card full>
          <Card.Body>
            <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 12, justifyContent: 'space-between', alignItems: 'center' }}>

              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View>
                  <Image source={{ uri: validateImg(data.photo) }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                </View>
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ fontWeight: 'bold' }}>{data.firstName} {data.lastName}</Text>
                  <Text>{data.age} Years</Text>
                </View>
              </View>

              <View>
                <Icon name="right" color='#000' size={25} />
              </View>

            </View>

          </Card.Body>
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <AppBar title='List Contact' children={
        <View style={{ marginRight: 16 }}>
          <Icon name="plus" color='#fff' size={25} onPress={() => {
            navigation.navigate(ADD_CONTACT_ROUTE as never);
          }} />
        </View>
      } />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {
          loading ?
            <CustomLoader />
            :
            contactData.length != 0 ?
            contactData.map((value, index) => {
              return (
                renderItem(index, value)
              )
            }) : <EmptyData title="Contact Empty" description="Please add contact" />
        }
      </ScrollView>
    </View>
  )
}

export default ListContactScreen