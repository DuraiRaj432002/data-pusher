exports.sendResponse = async (res, statusCode, data) => {
  res.status(statusCode).json(data);
};
