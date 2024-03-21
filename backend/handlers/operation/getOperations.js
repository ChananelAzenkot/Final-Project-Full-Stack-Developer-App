import { guard, adminGuard, businessGuard } from "../../guards.js";
import {
  IncrementalOperation,
  DailyOperation,
  LoggersOperation,
} from "./schemasOperations&Sales/operations.model.js";
import { getLoggedUserId } from "../../config/config.js";
import { User } from "../users/models/user.model.js";
import {
  DailyOperationSale,
  IncrementalOperationSale,
} from "./schemasOperations&Sales/operationSale.model.js";

export default (app) => {
  // get all Operations users //
  app.get("/api/allOperations", async (req, res) => {
    try {
      const operations = await IncrementalOperation.find();
      res.send(operations);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  // get all Operation of the logged user //
  app.get("/api/incrementalOperation", guard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const user = await User.findById(userId);

      const incrementalOperations = await IncrementalOperation.find({
        user_id: userId,
      });

      if (!incrementalOperations || incrementalOperations.length === 0) {
        return res
          .status(404)
          .json({ message: "No cards found for this user" });
      }
      res.send(incrementalOperations);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.get("/api/incrementalOperationSale", guard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const user = await User.findById(userId);

      const incrementalOperationsSale = await IncrementalOperationSale.find({
        user_id: userId,
      });

      if (
        !incrementalOperationsSale ||
        incrementalOperationsSale.length === 0
      ) {
        return res
          .status(404)
          .json({ message: "No cards found for this user" });
      }
      res.send(incrementalOperationsSale);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.get("/api/operationTeamSale", businessGuard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      // Fetch the user's data from the database
      const user = await User.findById(userId);
      console.log(user);

      // Check if the user is a business user and if the teamName is equal to the user's teamName
      if (user.teamName && user.IsBusiness) {
        const dailyOperationTeamSale = await IncrementalOperationSale.find({
          teamName: user.teamName,
        });

        if (!dailyOperationTeamSale || dailyOperationTeamSale.length === 0) {
          return res
            .status(404)
            .json({ message: "No cards found for this team" });
        }
        res.send(dailyOperationTeamSale);
      } else {
        res.status(403).json({
          message: "User is not a business user or does not belong to a team",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.get("/api/operationTeam", businessGuard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      // Fetch the user's data from the database
      const user = await User.findById(userId);
      console.log(user);

      // Check if the user is a business user and if the teamName is equal to the user's teamName
      if (user.teamName && user.IsBusiness) {
        const dailyOperationTeam = await DailyOperation.find({
          teamName: user.teamName,
        });

        if (!dailyOperationTeam || dailyOperationTeam.length === 0) {
          return res
            .status(404)
            .json({ message: "No cards found for this team" });
        }
        res.send(dailyOperationTeam);
      } else {
        res.status(403).json({
          message: "User is not a business user or does not belong to a team",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  // *** get a specific Operation by id test !!! ***//
  app.get("/api/operationId", guard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }
      const currentOperation = await DailyOperation.find({ user_id: userId });

      if (!currentOperation || currentOperation.length === 0) {
        return res
          .status(404)
          .json({ message: "No cards found for this user" });
      }
      res.send(currentOperation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.get("/api/operationSale", guard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }
      const currentSale = await DailyOperationSale.find({
        user_id: userId,
      });

      if (!currentSale || currentSale.length === 0) {
        return res
          .status(404)
          .json({ message: "No cards found for this user" });
      }
      res.send(currentSale);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.get("/api/getLastOperation/:userId", (req, res) => {
    const userId = req.params.userId;

    // Find the last operation of the user
    const lastOperation = operations
      .filter((operation) => operation.userId === userId)
      .sort((a, b) => b.operationTime - a.operationTime)[0];

    if (lastOperation) {
      res.json({ lastOperationTime: lastOperation.operationTime });
    } else {
      res.status(404).json({ message: "No operations found for this user." });
    }
  });
  // get a specific Operation by id //
  // app.get("/api/operationId/:id", async (req, res) => {
  //   try {
  //     const operationId = await LoggersOperation.findById(req.params.id);

  //     if (!operationId) {
  //       return res.status(404).json({ message: "operationId not found" });
  //     }

  //     res.send(operationId);
  //   } catch (error) {
  //     if (error.kind === "ObjectId") {
  //       return res.status(404).json({ message: "Invalid operation ID" });
  //     }
  //     res.status(500).json({ message: "Server error", error: error.message });
  //   }
  // });
};
