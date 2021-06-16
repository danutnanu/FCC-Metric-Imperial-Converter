const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert a valid input", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=10l")
      .end((err, res) => {
        const data = res.body;
        assert.equal(2.64172, data.returnNum);
        assert.equal("gal", data.returnUnit);
        done();
      });
  });
  test("Convert an invalid input unit", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        const data = res.body;
        assert.deepEqual({ error: "invalid unit" }, data);
        done();
      });
  });
  test("Convert an invalid number", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        const data = res.body;
        assert.deepEqual({ error: "invalid number" }, data);
        done();
      });
  });
  test("Convert an invalid number AND unit", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomemgram")
      .end((err, res) => {
        const data = res.body;
        assert.deepEqual({ error: "invalid number and unit" }, data);
        done();
      });
  });
  test("Convert with no number", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=mi")
      .end((err, res) => {
        const data = res.body;
        assert.equal(1.60934, data.returnNum);
        assert.equal("km", data.returnUnit);
        done();
      });
  });
  test("General", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=2mi")
      .end((err, res) => {
        const data = res.body;
        assert.equal(data.initNum, 2);
        assert.equal(data.initUnit, "mi");
        assert.approximately(data.returnNum, 3.21868, 0.001);
        assert.equal(data.returnUnit, "km", "returnUnit did not match");
        assert.equal(data.string, "2 miles converts to 3.21868 kilometers");
        done();
      });
  });
});
