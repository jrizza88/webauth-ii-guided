const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  console.log('in restricted')
  console.log(req.session)
  console.log('session name', req.session.username)
  // const { username, password } = req.headers;
  // if (req.session && req.sessions.username){
    if (req.session && req.sessions.username){
  // if (username && password) {
    // no need to call database now
    // Users.findBy({ username })
    //   .first()
    //   .then(user => {
    //     if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'you shall not pass!' });
        }
      // })
     // .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // }
  //  else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
};
