const Model = require("../Models/Opportunities");

exports.get = function(req, res, next) {
  Model.find({}, function(err, data) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json(data);
  });
};
