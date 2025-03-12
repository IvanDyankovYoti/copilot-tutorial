// Create web server using express
var express = require('express');
var app = express();

// Create a route for POST /comments
app.post('/comments', function(req, res) {
  // Create a new comment
  var newComment = req.body;
  // Add new comment to the database
  db.comments.insert(newComment, function(err, comment) {
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      res.status(201).json(comment);
    }
  });
});

// Create a route for GET /comments
app.get('/comments', function(req, res) {
  // Get all comments from the database
  db.comments.find({}, function(err, comments) {
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      res.status(200).json(comments);
    }
  });
});

// Create a route for GET /comments/:id
app.get('/comments/:id', function(req, res) {
  // Get the comment with the specified id
  db.comments.findOne({_id: req.params.id}, function(err, comment) {
    if (err) {
      res.status(500).json({error: err.message});
    } else if (!comment) {
      res.status(404).json({error: 'Comment not found'});
    } else {
      res.status(200).json(comment);
    }
  });
});

// Create a route for PUT /comments/:id
app.put('/comments/:id', function(req, res) {
  // Update the comment with the specified id
  db.comments.update({_id: req.params.id}, req.body, function(err, comment) {
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      res.status(200).json(comment);
    }
  });
});

// Create a route for DELETE /comments/:id
app.delete('/comments/:id', function(req, res) {
  // Delete the comment with the specified id
  db.comments.remove({_id: req.params.id}, function(err, comment) {
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      res.status(204).end();
    }
  });
});

// Start the web server on port 3000
app.listen(3000, function() {
  console.log
});
