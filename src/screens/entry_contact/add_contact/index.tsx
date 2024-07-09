import { List, Text, View, InputItem, Button, Toast, Provider } from '@ant-design/react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { IRequestContact } from '../../../data/contact';
import { addContact } from '../../../services/contact_service';

const AddContactScreen = () => {
    // const route = useRoute()
    // const { id }: any = route.params

    const navigation = useNavigation()

    const [valueInput, setValueInput] = useState<IRequestContact>({
        firstName: '',
        lastName: '',
        age: 0,
        photo:''
    })
    const [loading, setLoading] = useState<boolean>(false)

    // const handleChange = (event: any) => {
    //     const name = event.target.name
    //     const value = event.target.value
    //     setValueInput(val => ({ ...val, [name]: value }))
    // }
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
        if (valueInput.firstName == "" || valueInput.lastName == "" || valueInput.age == 0 || valueInput.photo == "") {
            Toast.fail("Please fill all field", 1)
        } else {
            setLoading(true)
            addContact(valueInput).then((val) => {
                alwaysShowToastLoading()
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                Toast.fail("Add contact failed", 1)
                setLoading(false)
            })
        }

    }

    return (
        <Provider>
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <List style={{ padding: 16 }}>
                    <List.Item style={{ borderWidth: 0.5, marginBottom: 16, borderColor: 'grey' }}>
                        <Text style={{ fontWeight: 'bold' }}>Firstname</Text>
                        <InputItem
                            textAlign='left'
                            // value={"123"}
                            name='firstname'
                            onChange={(value: any) => setValueInput({ ...valueInput, firstName: value })}
                            placeholder="Insert Firstname">
                        </InputItem>
                    </List.Item>
                    <List.Item style={{ borderWidth: 0.5, marginBottom: 16, borderColor: 'grey' }}>
                        <Text style={{ fontWeight: 'bold' }}>Lastname</Text>
                        <InputItem
                            // value={"123"}
                            name='lastname'
                            onChange={(value: any) => setValueInput({ ...valueInput, lastName: value })}
                            placeholder="Insert Lastname">
                        </InputItem>
                    </List.Item>
                    <List.Item style={{ borderWidth: 0.5, marginBottom: 16, borderColor: 'grey' }}>
                        <Text style={{ fontWeight: 'bold' }}>Age</Text>
                        <InputItem
                            // value={"123"}
                            type='number'
                            name='age'
                            onChange={(value: any) => setValueInput({ ...valueInput, age: value })}
                            placeholder="Insert Age">
                        </InputItem>
                    </List.Item>
                    <List.Item style={{ borderWidth: 0.5, marginBottom: 16, borderColor: 'grey' }}>
                        <Text style={{ fontWeight: 'bold' }}>Photo (Link)</Text>
                        <InputItem
                            // value={"123"}
                            name='photo'
                            onChange={(value: any) => setValueInput({ ...valueInput, photo: value })}
                            placeholder="Insert Link https//...">
                        </InputItem>
                    </List.Item>
                    <Button type='primary' onPress={handleSubmit} loading={loading}>Submit</Button>
                </List>
            </View>
        </Provider>
    )
}

export default AddContactScreen