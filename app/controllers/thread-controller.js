/**
 * Dependencies Model.
 */
var Thread = mongoose.model('Thread');

module.exports = function(app) {
  var root = '/cotobal';

  // Find
  app.param('id', function(req, res, next, id) {
    Thread.findOne({id: id}, function(err, message) {
      if (err) next(err);
      else if (!message) next(new Error('Not Found:' + id));
      else {
        req.message = message;
        next();
      }
    });
  });

  // List
  app.get(root + '/threads', function(req, res) {
    Thread.find()
      .asc('updated')
      .run(function(err, messages) {
        if (err) throw err;
        res.send(messages);
      });
  });

  // Create
  app.post(root + '/threads', function(req, res) {
    var thread = new Thread(req.body.thread);
    thread.save(function(err) {
      res.send(err);
    });
  });

  // View
  app.get(root + '/thread/:id', function(req, res) {
    res.send(req.thread);
  });

  // Update
  app.put(root + '/thread/:id', function(req, res) {
    var thread = req.thread;
    thread.set(req.body.room);
    thread.save(function(err) {
      res.send(err);
    });
  });

  // Delete
  app.del(root + '/thread/:id', function(req, res) {
    var thread = req.thread;
    thread.remove(function(err) {
      res.send(err);
    });
  });
};
