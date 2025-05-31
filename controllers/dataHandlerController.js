const axios = require("axios");
const { sendResponse } = require("../service/sendResponse");
const { executeFunction } = require("../service/dbConn");

exports.handleIncomingData = async (req, res) => {
  const token = req.headers["cl-x-token"];
  const data = req.body;

  let accountResult, destinationResult;

  console.log(token);

  if (!token)
    return await sendResponse(res, 401, { message: "Un Authenticate" });

  try {
    let accountQuery = {
      query: "SELECT * FROM accounts WHERE secret = ?;",
      values: [token],
    };
    accountResult = await executeFunction(JSON.stringify(accountQuery));

    if (!accountResult?.length) {
      return await sendResponse(res, 403, {
        message: "Forbidden. You do not have access to this resource.",
      });
    }
    console.log("+++++++++++++++++++++++++++++++++++++++++++=");
    console.log("accountResult", accountResult);
    console.log("+++++++++++++++++++++++++++++++++++++++++++=");

    let destinationQuery = {
      query: "SELECT * FROM destinations WHERE accountId = ?;",
      values: [accountResult[0]?.id],
    };
    destinationResult = await executeFunction(JSON.stringify(destinationQuery));

    console.log("+++++++++++++++++++++++++++++++++++++++++++=");
    console.log("destinationResult", destinationResult);
    console.log("+++++++++++++++++++++++++++++++++++++++++++=");

    return await sendResponse(res, 201, {
      message: "This API EndPoint is under development",
    });
  } catch (err) {
    await sendResponse(res, 500, { errorMessage: err.message });
  }
};
