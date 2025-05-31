const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");

router.post("/createDestination/", destinationController.createDestination);
router.get("/getAllDestinations/", destinationController.getAllDestinations);
router.get("/getDestinationById/", destinationController.getDestinationById);
router.get(
  "/getDestinationByAccountId/",
  destinationController.getDestinationByAccountId
);

router.put(
  "/updateDestinationById/:id",
  destinationController.updateDestination
);
router.delete(
  "/deleteDestinationById/:id",
  destinationController.deleteDestination
);

module.exports = router;
