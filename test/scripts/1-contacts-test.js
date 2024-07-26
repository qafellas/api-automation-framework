import { expect } from "chai"
import axios from "axios"
import UsersApi from "../api/usersApi.js"
import ContactApi from "../api/contactsApi.js"

describe("Contacts Tests", function () {
    let authToken
    before("set up", async function () {
        const userEmail = "john.dewey.113@yahoo.com"
        const userPassword = "johnWick123."
        await UsersApi.registerUser("Adam", "Sanchez", userEmail, userPassword)
        const authRes = await UsersApi.getAuthToken(userEmail, userPassword)
        authToken = authRes.token
    })

    after("tear down", async function () {
        await UsersApi.deleteUser(authToken)
    })

    it("should add new contact", async () => {
        const res = await ContactApi.addNewContact("Muro", "Can", "muro@xyz.com", authToken)
        expect(res.status).to.equal(201)
        expect(res.statusText).to.equal('Created')
        expect(res.data._id).not.to.be.null
        expect(res.data).have.property('country')
    })

})

