const userList = require('../db/user-list');
const fakeDelay = require('../utils/fake-delay');
const User = require('../db/userCreator');

exports.getUserList = async function(req, res) {
  await fakeDelay(100, 1000);
  res.status(200).json(userList);
}

exports.addUser = async function(req, res) {
  userList.push(new User(req.body));
  await fakeDelay(100, 2000);
  res.status(201).send();
}

exports.updateUser = async function(req, res) {
  const targetUser = userList.find(user => String(user.id) === req.params.id);
  Object.assign(targetUser, req.body);
  await fakeDelay(100, 2000);
  res.status(204).send();
}

exports.deleteUser = async function(req, res) {
  const userIndex = userList.findIndex(user => String(user.id) === req.params.id);

  if(userIndex !== -1) {
    userList.splice(userIndex, 1);
    await fakeDelay(100, 2000);
    res.status(204).send();
  } else {
    await fakeDelay(100, 1000);
    res.status(400).send({message: 'User was not found'});
  }
}
