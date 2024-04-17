import { guard } from "../../guards.js";
import {
  IncrementalOperation,
  DailyOperation,
} from "./schemasOperations&Sales/operations.model.js";
import { getLoggedUserId } from "../../config/config.js";
import {
  DailyOperationSale,
  IncrementalOperationSale,
} from "./schemasOperations&Sales/operationSale.model.js";
export default (app) => {

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
};



