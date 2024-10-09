const supertest = require("supertest");
var assert = require('assert');
const app = require("../app");

const baseUrl = "/users";

let body = {
    email: "johndoe@email.fr",
    name: "John Doe",
    password: "TestGRGDHDDH",
    INE: "GTE4562875DS"
}

let wrongPasswordBody = {
    email: "johndoe@email.fr",
    name: "John Doe",
    password: "TeDDH",
    INE: "GTE4562875DS"
}

let user = null

before("Setting up DB", () => {
    return new Promise((resolve) => {
        setTimeout( async () => {
            await supertest(app).post("/users/").send(body).expect(201).then(response => {
                user = response.body
            })

            resolve()
        })
        }, 500);
    
    
});

describe("All users.js integration testing", () => {
    describe("Test of GET / endpoint", () => {
        const url = baseUrl + "/";

        it("should get a 200 answer", async () => {
            await supertest(app)
                .get(url + "?name=test")
                .expect(200)
                .then(response => {
                    assert.equal(response.body.length, 0);
                });
        });

        it("should get 1 user", async () => {
            await supertest(app)
                .get(url)
                .expect(200)
                .then(response => {
                    assert.equal(response.body.length, 1);
                });
        });
    });

    describe("Test user creation", () => {
        const url = baseUrl + "/";

        it("Should create a user", async() => {
            body.email += "1";
            let ine = body.INE += "1";
            await supertest(app).post(url).send(body).expect(201).then(response => {
                assert.equal(response.body.email, "johndoe@email.fr1");
                assert.equal(response.body.INE, ine);
            });
        });

    
        it("Should get an error due to duplicate email", async() => {
            await supertest(app).post(url).send(body).expect(400).then(response => {
                assert.equal(typeof response.body, "object");
            });
        });
    
        it("Should get an error due to wrong password", async() => {
            await supertest(app).post(url).send(wrongPasswordBody).expect(400).then(response => {
                assert.equal(response.body.errors.password.message, "Error, password must be of minimum length : 7");
            });
        });
    });
})
