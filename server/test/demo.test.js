// testing mocha is working correctly
const assert = require('assert');

describe('some demo test ', function() {

    it('adds to number', function() {
        assert(2 + 3 == 5)
    });
})

  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert([1, 2, 3].indexOf(4), -1);
    });
  });
