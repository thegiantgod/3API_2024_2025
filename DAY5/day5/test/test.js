var assert = require('assert');
const { MongoMemoryServer } = require("mongodb-memory-server");
const { customUpperCase } = require("../utils/stringUtils");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

let serv;


before(async() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            MongoMemoryServer.create().then(server => {
                serv = server
                mongoose.connect(server.getUri(), { dbName: "testDB" }).then(() => {
                    console.log(`Connected to Mongodb ! url: ${server.getUri()}`);
                    resolve();
                });
            });
        }, 1000);
    }
    );
});


describe('All utils Unit tests', () => {
    describe('Test of String utils', () => {
        it('should return uppercase String', () => {
            const value = "test";
            const upper = customUpperCase(value);
            assert.equal(upper, "TEST");
        });

        it("should throw an exception", () => {
            const value = {test: "test"};
            assert.throws(() => {
                customUpperCase(value)
            }, {message: "You need to send a String object !"});
        });
    });
});

describe("All index.js integration testing", () => {
    describe("Test of /test endpoint", () => {
        const url = "/test";

        it("should get a 200 answer", async () => {
            await supertest(app)
                .get(url + "?name=test")
                .expect(200)
                .then(response => {
                    console.log(response.body)
                    assert.equal(response.body, "test");
                });
        });

        it("should get a 400 answer", async () => {
            await supertest(app)
                .get(url)
                .expect(400)
                .then(response => {
                    console.log(response.body)
                    assert.equal(response.body, "Send name first");
                });
        })
    })
})

describe("User test file", () => {
    require('./users.test')
})



after(async() => {
    try {
        await mongoose.connection.close();
        if (serv) {
            await serv.stop();
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})

