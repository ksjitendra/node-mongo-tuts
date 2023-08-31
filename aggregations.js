const collection = db.collection('users');
collection.aggregate([
  { $group: { _id: null, averageAge: { $avg: '$age' } } }
]).toArray((err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
});


collection.aggregate([
    { $sort: { score: -1 } }
  ]).toArray((err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });


  collection.aggregate([
    {
      $lookup: {
        from: 'customers',
        localField: 'customerId',
        foreignField: '_id',
        as: 'customer'
      }
    }
  ]).toArray((err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });
  