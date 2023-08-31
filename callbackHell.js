// Original nested callbacks
asyncOperation1(function (err, result1) {
    if (err) {
      console.error(err);
      return;
    }
    
    asyncOperation2(result1, function (err, result2) {
      if (err) {
        console.error(err);
        return;
      }
      
      asyncOperation3(result2, function (err, result3) {
        if (err) {
          console.error(err);
          return;
        }
        
        // Process result3
      });
    });
  });

//   By using named functions, you can separate the callbacks and make the code more readable:

asyncOperation1(function operation1Callback(err, result1) {
    if (err) {
      console.error(err);
      return;
    }
    
    asyncOperation2(result1, operation2Callback);
  });
  
  function operation2Callback(err, result2) {
    if (err) {
      console.error(err);
      return;
    }
    
    asyncOperation3(result2, operation3Callback);
  }
  
  function operation3Callback(err, result3) {
    if (err) {
      console.error(err);
      return;
    }
    
    // Process result3
  }

//   2. using promises
asyncOperation1()
  .then(result1 => asyncOperation2(result1))
  .then(result2 => asyncOperation3(result2))
  .then(result3 => {
    // Process result3
  })
  .catch(err => {
    console.error(err);
  });

//   3. using async await 
async function performOperations() {
    try {
      const result1 = await asyncOperation1();
      const result2 = await asyncOperation2(result1);
      const result3 = await asyncOperation3(result2);
      
      // Process result3
    } catch (err) {
      console.error(err);
    }
  }
  
  performOperations();
  
// 4. Using control flow libraries:

async.waterfall([
    asyncOperation1,
    asyncOperation2,
    asyncOperation3
  ], function (err, result3) {
    if (err) {
      console.error(err);
      return;
    }
    
    // Process result3
  });
  