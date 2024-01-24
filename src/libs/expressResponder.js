const _ = require('lodash');
function Responder() { }

/*
 * This method sends the response to the client.
 */
function sendResponse(res, status, body) {
  if (!res.headersSent)
    if (body)
      return res.status(status).json(body);
  return res.status(status).send();
}

/*
 * These methods are called to respond to the API user with the information on
 * what is the result of the incomming request
 */

Responder.success = (res, message) => {
  if (_.isString(message))
    message = { message: message };
  message.success = true;
  return sendResponse(res, 200, message);
}

Responder.error = (res, reason) => {
  let status = reason.statusCode || 200;
  reason.success = reason.success || false;
  try {
    if (reason.message)
      reason.message = reason.message;
    else
      reason.message = "Something went wrong!";
    if (reason.hasOwnProperty("message"))
      reason.message = reason.message;
    if (reason.hasOwnProperty("error"))
      reason.message = reason.error.message;
  } catch (error) {
    return sendResponse(res, status, { ...reason, message: `Error in responding func. ${error.message}` });;
  }
  return sendResponse(res, status, reason);
}

Responder.ResSuccess = Responder.success;

Responder.ResError = Responder.error;

module.exports = Responder;