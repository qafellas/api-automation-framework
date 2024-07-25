import { expect } from "chai"
import axios from "axios"

describe("User Tests", function () {
    const userEmail = "john.dewey.102@yahoo.com"
    const userPassword = "johnWick123."
    let userToken

    it("should register a new user", async () => {

        const url = "https://thinking-tester-contact-list.herokuapp.com/users"

        const payload = {
            firstName: "John",
            lastName: "Wick",
            email: userEmail,
            password: userPassword,
        }

        const headers = {
            "Content-Type": "application/json"
        }

        const response = await axios.post(url, payload, headers)

        expect(response.status).to.equal(201)
        expect(response.statusText).to.equal('Created')
        expect(response.data.user).have.property('_id')
        expect(response.data.user._id).not.to.be.null
        expect(response.data.user).have.property('firstName')
        expect(response.data.user).have.property('lastName')
        expect(response.data.user).have.property('email')
        expect(response.data.user).have.property('__v')
        expect(response.data.token).not.to.be.null
    })

    it("should not register existing user again", async () => {

        const url = "https://thinking-tester-contact-list.herokuapp.com/users"

        const payload = {
            firstName: "John",
            lastName: "Wick",
            email: userEmail,
            password: userPassword,
        }

        const headers = {
            "Content-Type": "application/json"
        }
        
        let res
        try {
             await axios.post(url, payload, headers) 
        } catch (error) {
            console.log(`Error: ${error.response.status}(${error.response.statusText}) - ${error.response.data.message}`)
            res = error.response
        }

       expect(res.status).to.equal(400)
       expect(res.statusText).to.equal('Bad Request')
       expect(res.data.message).to.equal('Email address is already in use')

    })

    it('should get authrozied/login for the new user', async () => {
        const url = "https://thinking-tester-contact-list.herokuapp.com/users/login"

        const payload = {
            email: userEmail,
            password: userPassword,
        }

        const headers = {
            "Content-Type": "application/json"
        }

        const response = await axios.post(url, payload, headers)

        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
        expect(response.data.user).have.property('_id')
        expect(response.data.user._id).not.to.be.null
        expect(response.data.user).have.property('firstName')
        expect(response.data.user).have.property('lastName')
        expect(response.data.user).have.property('email')
        expect(response.data.user).have.property('__v')
        expect(response.data.token).not.to.be.null
        userToken = response.data.token
        console.log(userToken)
    })

    it('should delete existing user', async () => {
        const url = "https://thinking-tester-contact-list.herokuapp.com/users/me"

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        }

        const response = await axios.delete(url, config)

        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')

    })
})

