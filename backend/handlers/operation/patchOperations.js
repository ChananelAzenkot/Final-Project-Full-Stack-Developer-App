import { guard, adminGuard, businessGuard } from "../../guards.js";
import {
  IncrementalOperation,
  DailyOperation,
  LoggersOperation,
} from "./schemasOperations&Sales/operations.model.js";
import { getLoggedUserId } from "../../config/config.js";
import { middlewareOperations } from "../../middleware/middlewareOperations.js";
import { User } from "../users/models/user.model.js";
import {
  DailyOperationSale,
  IncrementalOperationSale,
} from "./schemasOperations&Sales/operationSale.model.js";
import { middlewareSales } from "../../middleware/middlewareSale.js";
export default (app) => {
  // like a card by id number //
  app.patch("/api/cardLike/:id", guard, async (req, res) => {
    const { userId } = getLoggedUserId(req, res);
    if (!userId) {
      return res.status(403).json({ message: "User not authorized" });
    } else {
      try {
        const card = await Operation.findById(req.params.id);
        if (!card) {
          return res.status(404).json({ message: "Card not found" });
        }
        const index = card.likes.indexOf(userId);
        if (index === -1) {
          card.likes.push(userId);
        } else {
          card.likes.splice(index, 1);
        }
        await card.save();
        res.send("Card updated " + card.likes);
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  });
};
