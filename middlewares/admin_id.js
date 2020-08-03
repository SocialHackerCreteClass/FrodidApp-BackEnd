const admin_id = (req, res, next) => {
    if (req.session.user.role_id === 1 || req.params.id == req.session.user.id) {
        next();
      } else {
        res.send('Your account is not authorized to make changes.');
      }
  };
  
  module.exports = admin_id;