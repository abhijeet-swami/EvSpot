function sendResponse(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    sucess: true,
    message,
    data,
  });
}

export default sendResponse;
