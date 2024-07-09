import { Icon, Modal, Provider, Text, Toast, View } from '@ant-design/react-native'
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { IContact } from '../../data/contact';
import { deleteContact, fetchDetallContact } from '../../services/contact_service';
import CustomLoader from '../../components/CustomLoader';
import { Image, TouchableOpacity } from 'react-native';
import { EDIT_CONTACT_ROUTE } from '../../utils/route';
import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, checkFavourite, removeFavourite } from '../../redux/contactSlice';
import { RootState } from '../../redux/store';
import { validateImg } from '../../utils/extensions';
import { danger, success, textPrimary, warning } from '../../utils/colors';

const DetailContactScreen = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const isFavourite = useSelector((state: RootState) => state.contacts.isFavourite)

    const { id }: any = route.params

    const [contactData, setContactData] = useState<IContact>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleFetchDetail = async () => {
        setIsLoading(true)
        await fetchDetallContact(id).then(res => {
            setContactData(res.data)
            console.log("testing", res.data.id)
            handleCheckFavourite(res.data.id)
            setIsLoading(false)
        }).catch(err => {
            Toast.fail("Get contact failed", 1)
            console.log(err)
            setIsLoading(false)
        })
    }

    const handleDeleteContact = async () => {
        Toast.loading("Deleting contact...", 1)
        await deleteContact(id).then(res => {
            Toast.success("Delete contact success", 1)
            navigation.goBack()
        }).catch(err => {
            Toast.fail("Delete contact failed", 1)
            console.log(err)
        })
    }

    const ModalAlert = () => {
        Modal.alert('Delete Contact', 'Contact will delete permanently', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
            { text: 'OK', onPress: () => handleDeleteContact() },
        ])
    }

    const handleFavourite = () => {
        if (isFavourite) {
            dispatch(removeFavourite(contactData?.id))
        } else {
            dispatch(addFavourite(contactData))
        }

    }

    const handleCheckFavourite = (id: string) => {
        dispatch(checkFavourite(id))
    }

    const renderMenu = () => {
        return (

            <View style={{paddingHorizontal: 12}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(EDIT_CONTACT_ROUTE, {
                        contact: contactData
                    });
                }}>
                    <View style={{display: 'flex', flexDirection: 'row',paddingVertical: 12}}>
                        <Icon name='edit'size={'lg'} color={'grey'}/>
                        <Text style={{fontWeight:'500',fontSize:20,marginLeft:12}}>Edit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => ModalAlert()}>
                    <View style={{display: 'flex', flexDirection: 'row',paddingVertical: 12}}>
                    <Icon name='delete' size={'lg'} color={'grey'}/>
                    <Text style={{fontWeight:'500',fontSize:20,marginLeft:12}}>Delete</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFavourite()}>
                    <View style={{display: 'flex', flexDirection: 'row',paddingVertical: 12}}>
                        <Icon name='heart' size={'lg'} color={isFavourite ? danger : 'grey'}/>
                       <Text style={{fontWeight:'500',fontSize:20,marginLeft:12}}>{isFavourite ? "Remove" : "Add"} Favourite</Text> 
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    useFocusEffect(
        React.useCallback(() => {
            handleFetchDetail()
            return () => {
                // This function will be called when the screen goes out of focus
                // You can perform any necessary cleanup here
                // ...
            };
        }, []))

    useEffect(() => {
        handleFetchDetail()

    }, [])


    return (
        <Provider>
            <View style={{ flex: 1 }}>
                {
                    isLoading ? (
                        <CustomLoader />
                    ) : (
                        <View>
                            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 25 }}>
                                <Image source={{ uri: validateImg(contactData?.photo ?? "") }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>{contactData?.firstName} {contactData?.lastName}</Text>
                                <Text style={{ fontSize: 18, marginTop: 10 }}>{contactData?.age} Years</Text>

                               
                            </View>
                            {renderMenu()}
                        </View>
                           )
                }
            </View>
        </Provider>
    )
}

export default DetailContactScreen