import { guard, adminGuard, businessGuard } from "../../guards.js";
import {
  IncrementalOperation,
  DailyOperation,
} from "./schemasOperations&Sales/operations.model.js";
import { getLoggedUserId } from "../../config/config.js";
import { User } from "../../handlers/users/models/user.model.js";
import {
  DailyOperationSale,
  IncrementalOperationSale,
} from "./schemasOperations&Sales/operationSale.model.js";
export default (app) => {
  // delete a card by id number //
  app.delete(
    "/api/dailyOperationAgentEnd/:bizNumber",
    guard,
    async (req, res) => {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const bizNumber = req.params.bizNumber;

      try {
        const dailyOperation = await DailyOperation.findOne({
          bizNumber: bizNumber,
        });
        const incrementalOperation = await IncrementalOperation.findOne({
          bizNumber: bizNumber,
        });

        if (!dailyOperation || !incrementalOperation) {
          return res.status(404).json({ message: "Operation not found" });
        }

        await DailyOperation.deleteOne({ bizNumber: bizNumber });
        await IncrementalOperation.deleteOne({ bizNumber: bizNumber });

        res.send({ message: "Operation deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  );

  app.delete(
    "/api/dailyOperationStartSale/:bizNumber",
    guard,
    async (req, res) => {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const bizNumber = req.params.bizNumber;

      try {
        const dailyOperationSale = await DailyOperationSale.findOne({
          bizNumber: bizNumber,
        });
        const incrementalOperationSale = await IncrementalOperationSale.findOne(
          {
            bizNumber: bizNumber,
          }
        );

        if (!dailyOperationSale || !incrementalOperationSale) {
          return res.status(404).json({ message: "Operation not found" });
        }

        await DailyOperationSale.deleteOne({ bizNumber: bizNumber });
        await IncrementalOperationSale.deleteOne({ bizNumber: bizNumber });

        res.send({ message: "Operation deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  );

  // delete a card by id number //
  app.delete("/api/card/:id", businessGuard, async (req, res) => {
    try {
      const { userId, isAdmin } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      } else {
        const card = await Operation.findById(req.params.id);

        if (!card) {
          return res.status(404).json({ message: "Card not found" });
        }

        if (card.user_id.toString() !== userId && !isAdmin) {
          return res
            .status(403)
            .json({ message: "User not authorized to delete this card" });
        }

        await Operation.findByIdAndDelete(req.params.id);
        res.send("Card deleted successfully");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};


