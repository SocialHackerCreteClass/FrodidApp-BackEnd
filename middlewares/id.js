const id = (req, res, next) => {
    if (req.session.user.role_id === 1) {
        next();
      } else {
        res.send('Your account is not authorized to make changes.');
      }
  };
  
  module.exports = id;