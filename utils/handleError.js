const handleErrorHttp = (res, message= 'Something went wrong', code= 403) => {
  res.status(code).send({message});
};

module.exports = { handleErrorHttp };