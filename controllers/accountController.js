const { v4: uuidv4 } = require("uuid");
const { executeFunction } = require("../service/dbConn");
const { sendResponse } = require("../service/sendResponse");

// Create Account
exports.createAccount = async (req, res) => {
  const { email, name, website } = req.body;

  console.log(email, name, website);

  if (!email || !name) {
    return sendResponse(res, 400, {
      message: "Missing Parameters : Email and name is required.",
    });
  }

  const secret = uuidv4();

  try {
    let queries = {
      query: `INSERT INTO accounts ( email, name, secret, website) VALUES (?, ?, ?, ?)`,
      values: [email, name, secret, website || null],
    };

    await executeFunction(JSON.stringify(queries));

    return sendResponse(res, 201, {
      message: "Data Inserted Successfully",
    });
  } catch (err) {
    await sendResponse(res, 500, { errorMessage: err.message });
  }
};

// Get All Accounts
exports.getAccounts = async (req, res) => {
  try {
    let queries = {
      query: "SELECT * FROM accounts;",
      values: [],
    };
    let result = await executeFunction(JSON.stringify(queries));

    return sendResponse(res, 200, { data: result });
  } catch (err) {
    await sendResponse(res, 500, { errorMessage: err.message });
  }
};

// Get Single Account By Id
exports.getAccountById = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return sendResponse(res, 400, {
      message: "Missing Parameters : id is required.",
    });
  }
  try {
    let queries = {
      query: "SELECT * FROM accounts WHERE id = ?;",
      values: [id],
    };
    let result = await executeFunction(JSON.stringify(queries));

    if (!result.length) {
      return await sendResponse(res, 200, { message: "account not found" });
    }
    return sendResponse(res, 200, { data: result });
  } catch (err) {
    await sendResponse(res, 500, { errorMessage: err.message });
  }
};

// Update Account By Id
exports.updateAccountById = async (req, res) => {
  const { id } = req.params;
  const { email, name, website } = req.body;

  if (!id || !email || !name || !website) {
    return sendResponse(res, 400, {
      message: "Missing Parameters : id, email, name and website is required.",
    });
  }
  try {
    let existingQuery = {
      query: "SELECT * FROM accounts WHERE id = ?;",
      values: [id],
    };
    let isExisist = await executeFunction(JSON.stringify(existingQuery));

    if (!isExisist.length) {
      return await sendResponse(res, 200, { message: "account not found" });
    }

    let queries = {
      query:
        "UPDATE accounts SET email = ?, name = ?, website = ? WHERE id = ?",
      values: [email, name, website, id],
    };

    await executeFunction(JSON.stringify(queries));

    return sendResponse(res, 201, { message: "Data Updated Successfully" });
  } catch (err) {
    await sendResponse(res, 500, { errorMessage: err.message });
  }
};

// Delete Account and cascade delete destinations
exports.deleteAccountById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse(res, 400, {
      message: "Missing Parameters : id is required.",
    });
  }

  try {
    let existingQuery = {
      query: "SELECT * FROM accounts WHERE id = ?;",
      values: [id],
    };
    let isExisist = await executeFunction(JSON.stringify(existingQuery));

    if (!isExisist.length) {
      return await sendResponse(res, 200, { message: "account not found" });
    }
    let queries = {
      query: "DELETE FROM accounts WHERE id = ?",
      values: [id],
    };

    await executeFunction(JSON.stringify(queries));

    return sendResponse(res, 201, { message: "Data deleted Successfully" });
  } catch (err) {
    await sendResponse(res, 500, { errorMessage: err.message });
  }
};
