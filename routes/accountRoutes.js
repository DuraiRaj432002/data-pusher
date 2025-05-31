const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.post("/createAccount/", accountController.createAccount);
router.get("/getAllAccounts/", accountController.getAccounts);
router.get("/getAccountById/", accountController.getAccountById);
router.put("/updateAccountById/:id", accountController.updateAccountById);
router.delete("/deleteAccountById/:id", accountController.deleteAccountById);

module.exports = router;
