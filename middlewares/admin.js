const admin = (req, res, next) => {
    if (req.session.user.role_id === 1) {
        next();
      } else {
        res.status(401).send('Your account is not authorized to access this option.');
      }
  };
  
  module.exports = admin;