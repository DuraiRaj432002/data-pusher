const { sendResponse } = require("../service/sendResponse");
const { executeFunction } = require("../service/dbConn");

// Create Destination
exports.createDestination = async (req, res) => {
  try {
    const { accountId, url, method, headers } = req.body;

    if (!accountId || !url || !method || !headers) {
      return await sendResponse(res, 400, {
        message:
          "Missing Parameters: accountId, url, method, and headers is required",
      });
    }

    const headersStr = JSON.stringify(headers);

    let queries = {
      query: `INSERT INTO destinations (accountId, url, method, headers)
      VALUES ( ?, ?, ?, ?)`,
      values: [accountId, url, method, headersStr],
    };
    await executeFunction(JSON.stringify(queries));

    return await sendResponse(res, 201, {
      message: "Data Inserted Successfully",
    });
  } catch (err) {
    await sendResponse(res, 500, {
      message: "Internal Server Error",
      errorMessage: err.message,
    });
  }
};

// Get All Destinations
exports.getAllDestinations = async (req, res) => {
  try {
    let queries = {
      query: `SELECT * FROM destinations`,
      values: [],
    };
    let rows = await executeFunction(JSON.stringify(queries));

    const result = rows.map((row) => ({
      ...row,
      headers: JSON.parse(row.headers),
    }));

    return await sendResponse(res, 200, { data: result });
  } catch (error) {
    return await sendResponse(res, 500, {
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get Destination by ID
exports.getDestinationById = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return sendResponse(res, 400, {
        message: "Missing Parameters : id is required.",
      });
    }
    let queries = {
      query: `SELECT * FROM destinations WHERE id = ?`,
      values: [id],
    };
    let rows = await executeFunction(JSON.stringify(queries));

    console.log("++++++++++++++++++++++++++++++");
    console.log(...rows);

    console.log("++++++++++++++++++++++++++++++");

    if (!rows.length)
      return await sendResponse(res, 200, { message: "Destination not found" });

    let data = [
      {
        ...rows[0],
        headers: JSON.parse(rows[0].headers),
      },
    ];

    await sendResponse(res, 200, { data });
  } catch (error) {
    return await sendResponse(res, 500, {
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get Destination by  accountId
exports.getDestinationByAccountId = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return sendResponse(res, 400, {
        message: "Missing Parameters : id is required.",
      });
    }
    let queries = {
      query: `SELECT * FROM destinations WHERE accountId = ?`,
      values: [id],
    };
    let rows = await executeFunction(JSON.stringify(queries));

    console.log("++++++++++++++++++++++++++++++");
    console.log(...rows);

    console.log("++++++++++++++++++++++++++++++");

    if (!rows.length)
      return await sendResponse(res, 200, {
        message: "Destination not found for given accountId",
      });

    let data = [
      {
        ...rows[0],
        headers: JSON.parse(rows[0].headers),
      },
    ];

    await sendResponse(res, 200, { data });
  } catch (error) {
    return await sendResponse(res, 500, {
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update Destination
exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, method, headers } = req.body;

    if (!id || !url || !method || !headers)
      return await sendResponse(res, 400, {
        message: "Missing Parameters: id, url, method, and headers is required",
      });

    let existingQuery = {
      query: `SELECT * FROM destinations WHERE id = ?`,
      values: [id],
    };
    let isExisist = await executeFunction(JSON.stringify(existingQuery));

    if (!isExisist.length)
      return await sendResponse(res, 200, { message: "Destination not found" });

    const headersStr = JSON.stringify(headers);

    let queries = {
      query: `UPDATE destinations SET url = ?, method = ?, headers = ? WHERE id = ?`,
      values: [url, method, headersStr, id],
    };
    await executeFunction(JSON.stringify(queries));

    return sendResponse(res, 200, { data: "Data updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete Destination
exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, {
        message: "Missing Parameters : id is required.",
      });
    }

    let existingQuery = {
      query: `SELECT * FROM destinations WHERE id = ?`,
      values: [id],
    };
    let isExisist = await executeFunction(JSON.stringify(existingQuery));

    if (!isExisist.length)
      return await sendResponse(res, 200, { message: "Destination not found" });

    let queries = {
      query: "DELETE FROM destinations WHERE id = ?",
      values: [id],
    };

    await executeFunction(JSON.stringify(queries));

    return sendResponse(res, 201, { message: "Data deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
