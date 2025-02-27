import axios from "axios"
import dotenv from 'dotenv'
dotenv.config()

class Contacts {
    constructor() {
        axios.defaults.baseURL = process.env.BASE_URL
        axios.defaults.headers.common["Content-Type"] = "application/json"
    }

    async addNewContact(firstName, lastName, contactEmail, authToken){
        const endpoint = '/contacts'

        const payload = {
            "firstName": firstName,
            "lastName": lastName,
            "birthdate": "1970-01-01",
            "email": contactEmail,
            "phone": "6005555555",
            "street1": "1 Main St.",
            "street2": "Apartment A",
            "city": "Anytown",
            "stateProvince": "KS",
            "postalCode": "12345",
            "country": "USA"
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }

        let res
        try {
            res = await axios.post(endpoint, payload, config)
            return res
            
        } catch (error) {
            console.log(`Error: ${error.response.status}(${error.response.statusText}) - ${error.response.data.message}`)
            return error.response
        }


    }

    async editExistingContact(firstName, lastName, contactID, authToken){
        const endpoint = `/contacts/${contactID}`

        const payload = {
            "firstName": firstName,
            "lastName": lastName
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }

        let res
        try {
            res = await axios.patch(endpoint, payload, config)
            return res
            
        } catch (error) {
            console.log(`Error: ${error.response.status}(${error.response.statusText}) - ${error.response.data}`)
            return error.response
        }


    }

    async deleteContact(contactID, authToken){
        const endpoint = `/contacts/${contactID}`

        const config = {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        }

        let res
        try {
            res = await axios.delete(endpoint, config)
            return res
            
        } catch (error) {
            console.log(`Error: ${error.response.status}(${error.response.statusText}) - ${error.response.data}`)
            return error.response
        }

    }


}
export default new Contacts()