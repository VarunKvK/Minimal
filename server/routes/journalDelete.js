const express = require("express");
const Journal = require("../models/Journal");

const journalDeleteRoute = express.Router();

journalDeleteRoute
  .route("/journaldelete/:id")

  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const journal = await Journal.findById(id);
      if (!journal) {
        return res.status(404).json({ message: "journal not found" });
      }else{
          await Journal.deleteOne();
          res.status(200).json({ message: "journal deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
module.exports = journalDeleteRoute;
