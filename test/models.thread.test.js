var should = require('should');
require('../db-connect.js');
require('../app/models/thread');

describe('Thread', function() {
  var Thread = mongoose.model('Thread'),
      data = {};

  before(function(done) {
    Thread.remove({}, function(err) {
      Thread.create([
        { name: 'test1', message: 'message1' },
        { name: 'test2', message: 'message2' }
      ], function(err) {
        done();
      });
    });
  });

  beforeEach(function() {
    data = { name: 'testX', message: 'messageX' };
  });

  afterEach(function(done) {
    Thread.remove({ name: 'testX' }, function(err) {
      done();
    });
  });

  after(function(done) {
    Thread.remove({}, function(err) {
      done();
    });
  });

  describe('#save', function() {
    it('登録できること', function(done) {
      var thread = new Thread(data);

      thread.save(function(err) {
        should.not.exist(err);
        Thread.find({name: data.name}, function(err, docs) {
          should.not.exist(err);
          docs.should.have.length(1);
          docs[0].name.should.equal(data.name);
          done();
        });
      });
    });
  });
});
