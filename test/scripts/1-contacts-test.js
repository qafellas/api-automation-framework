import { expect } from "chai"
import axios from "axios"
import UsersApi from "../api/usersApi.js"
import ContactApi from "../api/contactsApi.js"

describe("Contacts Tests", function () {
    let authToken, contactID
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
        contactID = res.data._id
        console.log(`Contact ID: ${contactID}`)
        expect(res.data).have.property('country')
    })

    it("should edit existing contact", async () => {
        let firstname = 'Jack'
        let lastname = 'Harbor'
        const res = await ContactApi.editExistingContact(firstname, lastname, contactID, authToken)
        expect(res.status).to.equal(200)
        expect(res.statusText).to.equal('OK')
        expect(res.data.firstName).to.equal(firstname)
        expect(res.data.lastName).to.equal(lastname)
    })

    it("should not edit existing contact with invalid contactID", async () => {
        let firstname = 'Jack'
        let lastname = 'Harbor'
        const res = await ContactApi.editExistingContact(firstname, lastname, '66ac362taz3ea00013dd5bcb', authToken)
        expect(res.status).to.equal(400)
        expect(res.statusText).to.equal('Bad Request')
        expect(res.data).to.equal('Invalid Contact ID')
    })

    it("should delete contact", async () => {
        const res = await ContactApi.deleteContact(contactID, authToken)
        expect(res.status).to.equal(200)
        expect(res.statusText).to.equal('OK')
        expect(res.data).to.equal('Contact deleted')
    })

    it("should not delete contact with invalid contactID", async () => {
        const res = await ContactApi.deleteContact('66ac362taz3ea00013dd5bcb', authToken)
        expect(res.status).to.equal(400)
        expect(res.statusText).to.equal('Bad Request')
        expect(res.data).to.equal('Invalid Contact ID')
    })

})

