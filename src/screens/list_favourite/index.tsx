import { ActivityIndicator, Button, Card, Icon, ListView } from '@ant-design/react-native'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native'
import AppBar from '../../components/AppBar'
import { IContact, IResponseFetchContacts } from '../../data/contact'
import { fetchAllContacts } from '../../services/contact_service'
import CustomLoader from '../../components/CustomLoader'
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { ADD_CONTACT_ROUTE, DETAIL_CONTACT_ROUTE } from '../../utils/route'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store'
import { fetchFavourite } from '../../redux/contactSlice'
import { validateImg } from '../../utils/extensions'
import EmptyData from '../../components/EmptyData'

const ListFavouriteScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation()

  const contacts = useSelector((state:RootState) => state.contacts.favourite)

  const handleFetchFavourite = () => {
    dispatch(fetchFavourite())
    console.log("data",contacts)
  }

  useFocusEffect(
    React.useCallback(() => {
      handleFetchFavourite()
      return () => {
        // This function will be called when the screen goes out of focus
        // You can perform any necessary cleanup here
        // ...
      };
    }, []))

    useEffect(() => {
      handleFetchFavourite()
    
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
      <AppBar title='List Favourite' />
      <ScrollView>
        {
         contacts.length != 0 ?
         contacts.map((value, index) => {
            return (
              renderItem(index,value)
            )
          }) : <EmptyData title="Favourite Contact Empty" description="Please add favourite product" />
        }
      </ScrollView>
    </View>
  )
}

export default ListFavouriteScreen