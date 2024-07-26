import axios from "axios"
class Users {
    constructor() {
        axios.defaults.baseURL = 'https://thinking-tester-contact-list.herokuapp.com'
        axios.defaults.headers.common["Content-Type"] = "application/json"
    }

    async registerUser(firstName, lastName, userEmail, userPassword) {
        const endpoint = '/users'

        const payload = {
            firstName: firstName,
            lastName: lastName,
            email: userEmail,
            password: userPassword,
        }

        let response
        try {
            response = await axios.post(endpoint, payload)
            return response
        } catch (error) {
            console.log(`Error: ${error.response.status}(${error.response.statusText}) - ${error.response.data.message}`)
            return error.response
        }

    }

    async getAuthToken(userEmail, userPassword) {
        const endpoint = '/users/login'

        const payload = {
            email: userEmail,
            password: userPassword,
        }

        let res
        try {
            res = await axios.post(endpoint, payload) 
            return {
                "response": res,
                "token": res.data.token
            }
        } catch (error) {
            console.log(`Error: ${error.response.status}(${error.response.statusText}) - ${error.response.data.message}`)
            return error.response  
        }
        
    }

    async deleteUser(userToken) {
        const endpoint = '/users/me'

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }
        
        let response
        try {
            response = await axios.delete(endpoint, config)
            return response
            
        } catch (error) {
            console.log(`Error: ${error.response.status}(${error.response.statusText}) - ${error.response.data.error}`)
            return error.response 
        }
    }

}
export default new Users()