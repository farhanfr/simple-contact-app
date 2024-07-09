import axios from "axios"
import { BASE_URL } from "../utils/constant"


export const PROVIDER_GET = async (pathUrl: string) => {
    const headers = {
        'Content-Type': 'application/json',
        // 'api-key': API_KEY
    }
    const response = await axios.get(`${BASE_URL}/${pathUrl}`, { headers })
        .then((res) => {
            switch (res.status) {
                case 200:
                    return res.data
                case 201:
                    return res.data
                case 403:
                    throw "forbidden"
                default:
                    console.log("error")
                    break;
            }
        }).catch(err => {
            throw err
        })

    return response
}

export const PROVIDER_POST = async (pathUrl: string, data: any, useRawData: boolean = true) => {

    const headers = {
        'Content-Type': 'application/json',
        // 'api-key': API_KEY
    }

    const body = useRawData ? JSON.stringify(data) : data

    const response = await axios.post(`${BASE_URL}/${pathUrl}`, body, { headers })
        .then((res) => {
            switch (res.status) {
                case 200:
                    return res.data
                case 201:
                    return res.data
                default:
                    console.log("error")
                    break;
            }
        }).catch(err => {
            console.log("status =>", err.response.status)
            switch (err.response.status) {
                case 400:
                    throw err.response.data
                case 401:
                    throw err.response.data
                case 403:
                    throw "forbidden"
                case 404:
                    throw err.response.data
                case 500:
                    throw err.response.data
                default:
                    console.log("error")
                    break;
            }
        })

    return response

}

export const PROVIDER_DELETE = async (pathUrl: string) => {
    const headers = {
        'Content-Type': 'application/json',
        // 'api-key': API_KEY
    }
    const response = await axios.delete(`${BASE_URL}/${pathUrl}`, { headers })
        .then((res) => {
            switch (res.status) {
                case 200:
                    return res.data
                case 201:
                    return res.data
                case 403:
                    throw "forbidden"
                default:
                    console.log("error")
                    break;
            }
        }).catch(err => {
            console.log("status =>", err.response.status)
            switch (err.response.status) {
                case 400:
                    throw err.response.data
                case 401:
                    throw err.response.data
                case 403:
                    throw "forbidden"
                case 404:
                    throw err.response.data
                case 500:
                    throw err.response.data
                default:
                    console.log("error")
                    break;
            }
        })

    return response
}

export const PROVIDER_PUT = async (pathUrl: string, data: any, useRawData: boolean = true) => {

    const headers = {
        'Content-Type': 'application/json',
        // 'api-key': API_KEY
    }

    const body = useRawData ? JSON.stringify(data) : data

    const response = await axios.put(`${BASE_URL}/${pathUrl}`, body, { headers })
        .then((res) => {
            switch (res.status) {
                case 200:
                    return res.data
                case 201:
                    return res.data
                default:
                    console.log("error")
                    break;
            }
        }).catch(err => {
            console.log("status =>", err.response.status)
            switch (err.response.status) {
                case 400:
                    throw err.response.data
                case 401:
                    throw err.response.data
                case 403:
                    throw "forbidden"
                case 404:
                    throw err.response.data
                case 500:
                    throw err.response.data
                default:
                    console.log("error")
                    break;
            }
        })

    return response

}