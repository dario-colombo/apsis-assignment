import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
const mock = require('../mockdata.json');
import app from '../app';  

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST api/apsis', () => {
  it('test post API ', () => {
    return chai.request(app)
      .post('/api/apsis')
      .send(mock)
      .then(res => {      
        expect(res.status).to.equal(200);
        expect(res.body).to.eql({
          "frames": [
            {
              augmentedPoints: 8,
              first: 5,
              second: 3,              
              shotResult: "Open"
            }
          ],
          "score": 8
        });
      });
  });
});
