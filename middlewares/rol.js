const { handleErrorHttp } = require("../utils/handleError");

const checkRol = (roles) => (req,res,next) => {
  const { user } = req;
  const rolesUser = user.role;
  const isAuthorized = roles.some((role) => rolesUser.includes(role));
  if(!isAuthorized) {
    handleErrorHttp(res, 'Unauthorized', 401);
    return;
  }
  next();
}

module.exports = checkRol;