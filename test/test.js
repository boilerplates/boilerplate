/* deps: mocha */
var assert = require('assert');
var should = require('should');
var boilerplate = require('../');

describe('boilerplate', function () {
  it('should:', function () {
    boilerplate('a').should.eql({a: 'b'});
    boilerplate('a').should.equal('a');
  });

  it('should throw an error:', function () {
    (function () {
      boilerplate();
    }).should.throw('boilerplate expects valid arguments');
  });
});
