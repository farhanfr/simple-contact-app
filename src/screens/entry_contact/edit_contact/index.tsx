import { List, Text, View, InputItem, Button, Toast, Provider } from '@ant-design/react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { IRequestContact } from '../../../data/contact';
import { addContact, updateContact } from '../../../services/contact_service';

const EditContactScreen = () => {
    const route = useRoute()
    const { contact }: any = route.params

    const navigation = useNavigation()

    const [valueInput, setValueInput] = useState<IRequestContact>({
        firstName: contact.firstName,
        lastName: contact.lastName,
        age: contact.age,
        photo: contact.photo
    })
    const [loading, setLoading] = useState<boolean>(false)

    const alwaysShowToastLoading = () => {
        Toast.loading('Contact successfully added, redirect to list contact', 0, () => {
            navigation.goBack()
        })
        setTimeout(() => {
            Toast.removeAll()
        }, 3000)
    }

    const handleSubmit = async () => {
        console.log(valueInput)
        if (valueInput.firstName == "" || valueInput.lastName == "" || valueInput.age == 0) {
            Toast.fail("Please fill all field", 1)
        } else {
            setLoading(true)
            updateContact(valueInput, contact.id).then((val) => {
                alwaysShowToastLoading()
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                Toast.fail("Edit contact failed", 1)
                setLoading(false)
            })
        }
    }



    return (
        <Provider>
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <List style={{ padding: 16 }}>
                    <List.Item style={{ borderWidth: 0.5, marginBottom: 16, borderColor: 'grey' }}>
                        <Text>Firstname</Text>
                        <InputItem
                            textAlign='left'
                            value={valueInput.firstName}
                            name='firstname'
                            onChange={(value: any) => setValueInput({ ...valueInput, firstName: value })}
                            placeholder="Insert Firstname">
                        </InputItem>
                    </List.Item>
                    <List.Item style={{ borderWidth: 0.5, marginBottom: 16, borderColor: 'grey' }}>
                        <Text>Lastname</Text>
                        <InputItem
                            value={valueInput.lastName}
                            name='lastname'
                            onChange={(value: any) => setValueInput({ ...valueInput, lastName: value })}
                            placeholder="Insert Lastname">
                        </InputItem>
                    </List.Item>
                    <List.Item style={{ borderWidth: 0.5, marginBottom: 16, borderColor: 'grey' }}>
                        <Text>Age</Text>
                        <InputItem
                            value={valueInput.age.toString()}
                            type='number'
                            name='age'
                            onChange={(value: any) => setValueInput({ ...valueInput, age: value })}
                            placeholder="Insert Age">
                        </InputItem>
                    </List.Item>
                    <List.Item>
                        <Text>Photo</Text>
                    </List.Item>
                    <Button type='primary' onPress={handleSubmit} loading={loading}>Submit</Button>
                </List>
            </View>
        </Provider>
    )
}

export default EditContactScreen