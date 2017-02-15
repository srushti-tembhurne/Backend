var request = require("request");
const expect = require('chai').expect
process.env.PORT = 3000
var helloWorld = require("../../../server")
var base_url = "http://localhost:3000/"


describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(200);
        done();
      });
    });

    it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBe("Hello World");
        done();
      });
    });
  });
});