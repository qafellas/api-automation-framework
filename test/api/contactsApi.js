import axios from "axios"
class Contacts {
    constructor() {
        axios.defaults.baseURL = 'https://thinking-tester-contact-list.herokuapp.com'
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


}
export default new Contacts()