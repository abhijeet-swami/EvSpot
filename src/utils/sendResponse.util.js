function sendResponse(res, statusCode, message, data = null, token = null) {
  if (token) {
    res.cookie("uid", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  return res.status(statusCode).json({
    sucess: true,
    message,
    data,
  });
}

export default sendResponse;
