const resolvePromise = Promise.resolve(1);
resolvePromise
  .then(data => { console.log('①then : ', data); })
  .catch(error => { console.log('①catch : ', error); });

  const rejectPromise = Promise.reject(1);
rejectPromise
  .then(data => { console.log('②then : ', data); })
  .catch(error => { console.log('②catch : ', error); });

// ①then :  1
// ②catch :  1
