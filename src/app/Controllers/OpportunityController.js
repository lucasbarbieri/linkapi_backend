const Model = require("../Models/Opportunities");

exports.get = function(req, res, next) {
  Model.aggregate(
    [
      {
        $project: {
          total: "$total",
          created_at: {
            $dateToString: { format: "%Y-%m-%d", date: "$created_at" }
          }
        }
      },
      {
        $group: {
          _id: { created_at: "$created_at", total: "$total" },
          count: { $sum: 1 }
        }
      }
    ],
    function(err, data) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      return res.status(200).json(data);
    }
  );
};
