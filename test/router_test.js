var expect = require('chai').expect;
var Router = require(__dirname + '/../lib/router');

describe('sea d45 router', function() {
  beforeEach(function() {
    this.router = new Router();
  });

  describe('rest handling', function() {
    before(function() {
      this.req = {
        method: '',
        url: 'testurl'
      };
      this.res = {
        test: 'some test'
      };
    });
  
    it('should be a router', function() {
      expect(this.router.routes).to.have.property('GET');
      expect(this.router.routes).to.have.property('POST');
      expect(this.router.routes).to.have.property('PUT');
      expect(this.router.routes).to.have.property('PATCH');
      expect(this.router.routes).to.have.property('DELETE');
    });

    it('should 404', function() {
      var cbCalled = {
        writeHead: false,
        write: false,
        end: false
      };
      this.req.method = 'GET';
      var res = {
        writeHead: function(status, headers) {
          cbCalled.writeHead = true;
          expect(status).to.eql(404);
          expect(headers).to.eql({'Content-Type' : 'text/plain'});
        },
        write: function(text) {
          cbCalled.write = true;
          expect(text).to.eql('not found');
        },
        end: function() {
          cbCalled.end = true;
        }
      };
      this.router.route(this.req, res);
      expect(cbCalled.writeHead).to.eql(true);
      expect(cbCalled.write).to.eql(true);
      expect(cbCalled.end).to.eql(true);
    });

    it('should be able to setup a get route', function() {
      this.req.method = 'GET';
      var cbCalled = false;

      this.router.get('testurl', function(testreq, testres) {
        cbCalled = true;
        expect(testreq).to.eql(this.req);
        expect(testres).to.eql(this.res);
      }).bind(this);

      this.router.route(this.req, this.res);
      expect(cbCalled).to.eql(true);
    });

    it('should be able to setup a post route', function() {
      this.req.method = 'POST';
      var cbCalled = false;

      this.router.post('testurl', function(testreq, testres) {
        cbCalled = true;
        expect(testreq).to.eql(this.req);
        expect(testres).to.eql(this.res);
      }).bind(this);

      this.router.route(this.req, this.res);
      expect(cbCalled).to.eql(true);
    });
  });
});
