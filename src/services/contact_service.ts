import { IRequestContact } from "../data/contact"
import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../helper/provider_api"
import { IMG_DUMMY } from "../utils/constant"

export const fetchAllContacts = async () => {
    const response = await PROVIDER_GET(`contact`)
    return response
}

export const addContact = async (dataInput: IRequestContact) => {
    const data = {
        "firstName": dataInput.firstName,
        "lastName": dataInput.lastName,
        "age": dataInput.age,
        "photo": dataInput.photo ?? IMG_DUMMY,
    }
    console.log("addContact", data)
    const response = await PROVIDER_POST(`contact`, data, true)
    return response
}

export const fetchDetallContact = async (id:string) => {
    const response = await PROVIDER_GET(`contact/${id}`)
    return response
}

export const updateContact = async (dataInput: IRequestContact, id: string) => {
    const data = {
        "firstName": dataInput.firstName,
        "lastName": dataInput.lastName,
        "age": dataInput.age,
        "photo": dataInput.photo ?? IMG_DUMMY,
    }
    console.log("updateContact", data)
    const response = await PROVIDER_PUT(`contact/${id}`, data, true)
    return response
}

export const deleteContact = async (id:string) => {
    const response = await PROVIDER_DELETE(`contact/${id}`)
    return response
}