module.exports = function (min = 0, max = 0) {
  const waitingTime = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => {
    setTimeout(_ => {
      resolve();
    }, waitingTime);
  });
}
