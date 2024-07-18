import { expect } from "chai"
import axios from "axios"

describe("Contact Tests", function () {
    it("should register a new user", async () => {

        const url = "https://thinking-tester-contact-list.herokuapp.com/users"

        const payload = {
            firstName: "John",
            lastName: "Wick",
            email: "john.wick.96@yahoo.com",
            password: "johnWick123.",
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
})
