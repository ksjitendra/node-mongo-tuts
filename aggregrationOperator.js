// $match
db.collection.aggregate([
    { $match: { field: value } }
  ]);
  
  // $group
  db.collection.aggregate([
    { $group: { _id: "$field", total: { $sum: "$quantity" } } }
  ]);
  
  // $sort
  db.collection.aggregate([
    { $sort: { field: 1 } }
  ]);
  
  // $project
  db.collection.aggregate([
    { $project: { _id: 0, field1: 1, field2: 1 } }
  ]);
  
  // $limit
  db.collection.aggregate([
    { $limit: 10 }
  ]);
  
  // $skip
  db.collection.aggregate([
    { $skip: 5 }
  ]);
  
  // $unwind
  db.collection.aggregate([
    { $unwind: "$arrayField" }
  ]);
  
  // $lookup
  db.collection.aggregate([
    {
      $lookup: {
        from: "anotherCollection",
        localField: "field1",
        foreignField: "field2",
        as: "matchedData"
      }
    }
  ]);
  
  // $sum, $avg, $min, $max
  db.collection.aggregate([
    { $group: { _id: null, total: { $sum: "$field" } } }
  ]);
  
  // $project and $expr
  db.collection.aggregate([
    {
      $project: {
        field1: 1,
        field2: {
          $expr: { $multiply: ["$field1", "$field2"] }
        }
      }
    }
  ]);
  