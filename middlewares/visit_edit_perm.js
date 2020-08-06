const visit_edit_perm = (req, res, next) => {
    let authorized = false;
    //Checks if account is an admin one
    if (req.session.user.role_id === 1) 
        authorized = true;
    else {   
        // Checks if that visit id belongs to the account trying to access it
        const visit_id_array = req.session.user.visits_id.map(visits => visits);
        visit_id_array.forEach(el => {
            if (parseInt(req.params.id) === el)
                authorized = true;
        });
    }

    if(authorized)
        next();
    else
        res.status(401).send('Your account is not authorized to access this option.');
  };
  
  module.exports = visit_edit_perm;