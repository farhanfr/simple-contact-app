import { Modal, Provider, Text, Toast, View } from '@ant-design/react-native'
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { IContact } from '../../data/contact';
import { deleteContact, fetchDetallContact } from '../../services/contact_service';
import CustomLoader from '../../components/CustomLoader';
import { TouchableOpacity } from 'react-native';
import { EDIT_CONTACT_ROUTE } from '../../utils/route';

const DetailContactScreen = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const { id }: any = route.params

    const [contactData, setContactData] = useState<IContact>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleFetchDetail = async () => {
        setIsLoading(true)
        await fetchDetallContact(id).then(res => {
            setContactData(res.data)
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

    useFocusEffect(
        React.useCallback(() => {
            handleFetchDetail()
            return () => {
                // This function will be called when the screen goes out of focus
                // You can perform any necessary cleanup here
                // ...
            };
        }, []))

    const renderMenuBottom = () => {
        return (

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 50, backgroundColor: 'white', position: 'absolute', bottom: 0, shadowOpacity: 3 }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(EDIT_CONTACT_ROUTE, {
                        contact: contactData
                    });
                }}>
                    <View style={{ flex: 1 }}>
                        Edit Contact
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => ModalAlert()}>
                    <View style={{ flex: 1 }}>
                        Delete Contact
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

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
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 16, marginTop: 16, marginBottom: 8 }}>{contactData?.firstName}</Text></View>)
                }

                {
                    renderMenuBottom()
                }
            </View>
        </Provider>
    )
}

export default DetailContactScreen