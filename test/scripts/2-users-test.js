import { expect } from "chai"
import axios from "axios"
import UsersApi from "../api/usersApi.js"

describe("User Tests", function () {
    const userEmail = "john.dewey.108@yahoo.com"
    const userPassword = "johnWick123."
    let userToken

    it("should register a new user", async () => {
        const response = await UsersApi.registerUser("Adam", "Sanchez", userEmail, userPassword)
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
       const res = await UsersApi.registerUser("Adam", "Sanchez", userEmail, userPassword)
       expect(res.status).to.equal(400)
       expect(res.statusText).to.equal('Bad Request')
       expect(res.data.message).to.equal('Email address is already in use')
    })

    it('should get authrozied/login for the new user', async () => {

        const res = await UsersApi.getAuthToken(userEmail, userPassword)

        expect(res.response.status).to.equal(200)
        expect(res.response.statusText).to.equal('OK')
        expect(res.response.data.user).have.property('_id')
        expect(res.response.data.user._id).not.to.be.null
        expect(res.response.data.user).have.property('firstName')
        expect(res.response.data.user).have.property('lastName')
        expect(res.response.data.user).have.property('email')
        expect(res.response.data.user).have.property('__v')
        expect(res.response.data.token).not.to.be.null
        userToken = res.token
        console.log(userToken)
    })

    it('should delete existing user', async () => {

        const response = await UsersApi.deleteUser(userToken)

        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')

    })

    it('should not delete existing user with invalid token', async () => {
        //Fake token
        const response = await UsersApi.deleteUser('eyJogftbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEyZmUzMzEzZmQ2ZjAwMTM3YTk1NzEiLCJpYXQiOjE3MjE5NTc5Mzl9.LUJOkG0TDvr4FZSdp0xvtxbCSYkl_OsegTiXJXD-HyQ')

        expect(response.status).to.equal(401)
        expect(response.statusText).to.equal('Unauthorized')
        expect(response.data.error).to.equal('Please authenticate.')
    })


})

