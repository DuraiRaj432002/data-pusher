const express = require("express");

const accountRoutes = require("./routes/accountRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const dataHandlerRoutes = require("./routes/dataHandlerRoutes");
const { sendResponse } = require("./service/sendResponse");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/account", accountRoutes);
app.use("/destination", destinationRoutes);
app.use("/server", dataHandlerRoutes);

app.use(async (req, res) => {
  return await sendResponse(res, 404, { error: "Not Found" });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
