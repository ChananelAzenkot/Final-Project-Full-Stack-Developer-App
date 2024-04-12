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
  app.get("/api/allOperations", async (req, res) => {
    try {
      const operations = await IncrementalOperation.find();
      res.send(operations);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.get("/api/incrementalOperationTeam", guard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const user = await User.findById(userId);

      const incrementalOperations = await IncrementalOperation.aggregate([
        {
          $match: {
            teamName: user.teamName,
          },
        },
        {
          $addFields: {
            productivity: {
              $convert: {
                input: {
                  $substr: [
                    "$productivity",
                    0,
                    { $subtract: [{ $strLenCP: "$productivity" }, 1] },
                  ],
                },
                to: "double",
                onError: 0.0,
              },
            },
            simurFiber: {
              $convert: {
                input: {
                  $substr: [
                    "$simurFiber",
                    0,
                    { $subtract: [{ $strLenCP: "$simurFiber" }, 1] },
                  ],
                },
                to: "double",
              },
            },
            satisfaction: {
              $convert: {
                input: {
                  $substr: [
                    "$satisfaction",
                    0,
                    { $subtract: [{ $strLenCP: "$satisfaction" }, 1] },
                  ],
                },
                to: "double",
              },
            },
            simurTV: {
              $convert: {
                input: {
                  $substr: [
                    "$simurTV",
                    0,
                    { $subtract: [{ $strLenCP: "$simurTV" }, 1] },
                  ],
                },
                to: "double",
              },
            },
          },
        },
        {
          $group: {
            _id: { user_id: "$user_id" },
            nameAgent: { $first: "$nameAgent" },
            teamName: { $first: "$teamName" },
            numberCalls: { $sum: "$numberCalls" },
            tvDisconnection: { $sum: "$tvDisconnection" },
            fiberDisconnection: { $sum: "$fiberDisconnection" },
            sellerFiber: { $sum: "$sellerFiber" },
            sellerTV: { $sum: "$sellerTV" },
            easyMesh: { $sum: "$easyMesh" },
            productivity: { $avg: "$productivity" },
            satisfaction: { $avg: "$satisfaction" },
            upgradeProgress: { $sum: "$upgradeProgress" },
            targets: { $sum: "$targets" },
            simurFiber: { $avg: "$simurFiber" },
            simurTV: { $avg: "$simurTV" },
          },
        },
      ]);

      if (!incrementalOperations || incrementalOperations.length === 0) {
        return res.json({ message: "לא נמצא תפעול מצטבר של החודש הזה" });
      }

      res.send(incrementalOperations);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.get("/api/incrementalOperationTeamAvg", guard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      const user = await User.findById(userId);

      const incrementalOperations = await IncrementalOperation.aggregate([
        {
          $match: {
            teamName: user.teamName,
          },
        },
        {
          $addFields: {
            productivity: {
              $convert: {
                input: {
                  $substr: [
                    "$productivity",
                    0,
                    { $subtract: [{ $strLenCP: "$productivity" }, 1] },
                  ],
                },
                to: "double",
              },
            },
            simurFiber: {
              $convert: {
                input: {
                  $substr: [
                    "$simurFiber",
                    0,
                    { $subtract: [{ $strLenCP: "$simurFiber" }, 1] },
                  ],
                },
                to: "double",
              },
            },
            satisfaction: {
              $convert: {
                input: {
                  $substr: [
                    "$satisfaction",
                    0,
                    { $subtract: [{ $strLenCP: "$satisfaction" }, 1] },
                  ],
                },
                to: "double",
              },
            },
            simurTV: {
              $convert: {
                input: {
                  $substr: [
                    "$simurTV",
                    0,
                    { $subtract: [{ $strLenCP: "$simurTV" }, 1] },
                  ],
                },
                to: "double",
              },
            },
          },
        },
        {
          $group: {
            _id: "$teamName",
            numberCalls: { $sum: "$numberCalls" },
            tvDisconnection: { $sum: "$tvDisconnection" },
            fiberDisconnection: { $sum: "$fiberDisconnection" },
            sellerFiber: { $sum: "$sellerFiber" },
            sellerTV: { $sum: "$sellerTV" },
            easyMesh: { $sum: "$easyMesh" },
            productivity: { $avg: "$productivity" },
            satisfaction: { $avg: "$satisfaction" },
            upgradeProgress: { $sum: "$upgradeProgress" },
            targets: { $sum: "$targets" },
            simurFiber: { $avg: "$simurFiber" },
            simurTV: { $avg: "$simurTV" },
          },
        },
      ]);

      if (!incrementalOperations || incrementalOperations.length === 0) {
        return res.json({ message: "לא נמצא תפעול מצטבר של החודש הזה" });
      }

      res.send(incrementalOperations);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

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
        return res.json({ message: "לא נמצא תפעול מצטבר של החודש הזה" });
      }
      res.send(incrementalOperations);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.get("/api/incrementalOperatingAverage", guard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      let incrementalOperations = await IncrementalOperation.find({
        user_id: userId,
      });

      if (!incrementalOperations || incrementalOperations.length === 0) {
        return res.json({ message: "עדין אין ממוצע מצטבר לחודש הזה" });
      }

      incrementalOperations = incrementalOperations.map((operation) => ({
        ...operation._doc,
        monthYear: new Date(operation.createTime).toLocaleDateString("en-US", {
          month: "2-digit",
          year: "numeric",
        }),
      }));

      const operationsByMonth = incrementalOperations.reduce(
        (groups, operation) => {
          const monthYear = operation.monthYear;
          if (!groups[monthYear]) {
            groups[monthYear] = [];
          }
          groups[monthYear].push(operation);
          return groups;
        },
        {}
      );

      const averagesByMonth = {};
      for (const monthYear in operationsByMonth) {
        const operations = operationsByMonth[monthYear];
        let totalNumberCalls = 0;
        let totalTvDisconnection = 0;
        let totalFiberDisconnection = 0;
        let totalSellerFiber = 0;
        let totalSellerTV = 0;
        let totalEasyMesh = 0;
        let totalUpgradeProgress = 0;
        let totalProductivity = 0;
        let totalSimurFiber = 0;
        let totalSimurTV = 0;
        let totalSatisfaction = 0;

        operations.forEach((operation) => {
          totalNumberCalls += operation.numberCalls;
          totalTvDisconnection += operation.tvDisconnection;
          totalFiberDisconnection += operation.fiberDisconnection;
          totalSellerFiber += operation.sellerFiber;
          totalSellerTV += operation.sellerTV;
          totalEasyMesh += operation.easyMesh;
          totalUpgradeProgress += operation.upgradeProgress;
          totalProductivity += parseFloat(operation.productivity);
          totalSimurFiber += parseFloat(operation.simurFiber);
          totalSimurTV += parseFloat(operation.simurTV);
          totalSatisfaction += parseFloat(operation.satisfaction);
        });

        averagesByMonth[monthYear] = {
          totalNumberCalls: totalNumberCalls,
          totalTvDisconnection: totalTvDisconnection,
          totalFiberDisconnection: totalFiberDisconnection,
          totalSellerFiber: totalSellerFiber,
          totalSellerTV: totalSellerTV,
          totalEasyMesh: totalEasyMesh,
          totalUpgradeProgress: totalUpgradeProgress,
          totalProductivity: (totalProductivity / operations.length).toFixed(2),
          totalSimurFiber:
            (totalSimurFiber / operations.length).toFixed(2) + "%",
          totalSimurTV: (totalSimurTV / operations.length).toFixed(2) + "%",
          totalSatisfaction:
            (totalSatisfaction / operations.length).toFixed(2) + "%",
        };
      }

      res.send(averagesByMonth);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

    app.get("/api/incrementalOperatingAveragePerAgent", guard, async (req, res) => {
      try {
        const { userId } = getLoggedUserId(req, res);

        if (!userId) {
          return res.status(403).json({ message: "User not authorized" });
        }
        const user = await User.findById(userId);

        let incrementalOperations = await IncrementalOperation.find({
          teamName: user.teamName,
        });

        if (!incrementalOperations || incrementalOperations.length === 0) {
          return res.json({ message: "עדין אין ממוצע מצטבר לחודש הזה" });
        }

        incrementalOperations = incrementalOperations.map((operation) => ({
          ...operation._doc,
          monthYear: new Date(operation.createTime).toLocaleDateString(
            "en-US",
            {
              month: "2-digit",
              year: "numeric",
            }
          ),
        }));

        const operationsByMonth = incrementalOperations.reduce(
          (groups, operation) => {
            const monthYear = operation.monthYear;
            if (!groups[monthYear]) {
              groups[monthYear] = [];
            }
            groups[monthYear].push(operation);
            return groups;
          },
          {}
        );

        const averagesByMonth = {};
        for (const monthYear in operationsByMonth) {
          const operations = operationsByMonth[monthYear];
          let totalNumberCalls = 0;
          let totalTvDisconnection = 0;
          let totalFiberDisconnection = 0;
          let totalSellerFiber = 0;
          let totalSellerTV = 0;
          let totalEasyMesh = 0;
          let totalUpgradeProgress = 0;
          let totalProductivity = 0;
          let totalSimurFiber = 0;
          let totalSimurTV = 0;
          let totalSatisfaction = 0;

          operations.forEach((operation) => {
            totalNumberCalls += operation.numberCalls;
            totalTvDisconnection += operation.tvDisconnection;
            totalFiberDisconnection += operation.fiberDisconnection;
            totalSellerFiber += operation.sellerFiber;
            totalSellerTV += operation.sellerTV;
            totalEasyMesh += operation.easyMesh;
            totalUpgradeProgress += operation.upgradeProgress;
            totalProductivity += parseFloat(operation.productivity);
            totalSimurFiber += parseFloat(operation.simurFiber);
            totalSimurTV += parseFloat(operation.simurTV);
            totalSatisfaction += parseFloat(operation.satisfaction);
          });

          averagesByMonth[monthYear] = {
            totalNumberCalls: totalNumberCalls,
            totalTvDisconnection: totalTvDisconnection,
            totalFiberDisconnection: totalFiberDisconnection,
            totalSellerFiber: totalSellerFiber,
            totalSellerTV: totalSellerTV,
            totalEasyMesh: totalEasyMesh,
            totalUpgradeProgress: totalUpgradeProgress,
            totalProductivity: (totalProductivity / operations.length).toFixed(
              2
            ),
            totalSimurFiber:
              (totalSimurFiber / operations.length).toFixed(2) + "%",
            totalSimurTV: (totalSimurTV / operations.length).toFixed(2) + "%",
            totalSatisfaction:
              (totalSatisfaction / operations.length).toFixed(2) + "%",
          };
        }

        res.send(averagesByMonth);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    });

  app.get("/api/dailyOperatingAverageByTeam", guard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }
      const user = await User.findById(userId);

      if (user.teamName && user.IsBusiness) {
        let dailyOperations = await DailyOperation.find({
          teamName: user.teamName,
        });

        if (!dailyOperations || dailyOperations.length === 0) {
          return res.json({
            message: "No daily operations found for this user",
          });
        }

        dailyOperations = dailyOperations.map((operation) => ({
          ...operation._doc,
          day: new Date(operation.createTime).toLocaleDateString("en-US"),
        }));

        const operationsByTeamAndDay = dailyOperations.reduce(
          (groups, operation) => {
            const teamName = operation.teamName;
            const day = operation.day;
            const key = `${teamName}-${day}`;
            if (!groups[key]) {
              groups[key] = [];
            }
            groups[key].push(operation);
            return groups;
          },
          {}
        );

        const averagesByTeamAndDay = {};
        for (const key in operationsByTeamAndDay) {
          const operations = operationsByTeamAndDay[key];
          let totalNumberCalls = 0;
          let totalTvDisconnection = 0;
          let totalFiberDisconnection = 0;
          let totalSellerFiber = 0;
          let totalSellerTV = 0;
          let totalEasyMesh = 0;
          let totalUpgradeProgress = 0;
          let totalProductivity = 0;
          let totalSimurFiber = 0;
          let totalSimurTV = 0;
          let totalSatisfaction = 0;

          operations.forEach((operation) => {
            totalNumberCalls += operation.numberCalls;
            totalTvDisconnection += operation.tvDisconnection;
            totalFiberDisconnection += operation.fiberDisconnection;
            totalSellerFiber += operation.sellerFiber;
            totalSellerTV += operation.sellerTV;
            totalEasyMesh += operation.easyMesh;
            totalUpgradeProgress += operation.upgradeProgress;
            totalProductivity += parseFloat(operation.productivity);
            totalSimurFiber += parseFloat(operation.simurFiber);
            totalSimurTV += parseFloat(operation.simurTV);
            totalSatisfaction += parseFloat(operation.satisfaction);
          });
          // ...
          averagesByTeamAndDay[key] = {
            totalNumberCalls: totalNumberCalls,
            totalTvDisconnection: totalTvDisconnection,
            totalFiberDisconnection: totalFiberDisconnection,
            totalSellerFiber: totalSellerFiber,
            totalSellerTV: totalSellerTV,
            totalEasyMesh: totalEasyMesh,
            totalUpgradeProgress: totalUpgradeProgress,
            totalProductivity: (totalProductivity / operations.length).toFixed(
              2
            ),
            totalSimurFiber:
              (totalSimurFiber / operations.length).toFixed(2) + "%",
            totalSimurTV: (totalSimurTV / operations.length).toFixed(2) + "%",
            totalSatisfaction:
              (totalSatisfaction / operations.length).toFixed(2) + "%",
            // ...
          };
        }

        res.send(averagesByTeamAndDay);
        console.log(averagesByTeamAndDay);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.get("/api/dailyOperatingAverageSaleTeam", guard, async (req, res) => {
    try {
      const user = getLoggedUserId(req, res);

      if (!user || !user.IsBusiness) {
        return res.status(403).json({ message: "User not authorized" });
      }

      let dailyOperations = await DailyOperationSale.find({
        teamName: user.teamName,
      });

      if (!dailyOperations || dailyOperations.length === 0) {
        return res.json({ message: "" });
      }

      dailyOperations = dailyOperations.map((operation) => ({
        ...operation._doc,
        date: new Date(operation.createTime).toLocaleDateString("en-US"),
      }));

      const operationsByDate = dailyOperations.reduce((groups, operation) => {
        const date = operation.date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(operation);
        return groups;
      }, {});

      const averagesByDate = {};
      for (const date in operationsByDate) {
        const operations = operationsByDate[date];
        let totalSellerFiber = 0;
        let totalSellerTV = 0;
        let totalEasyMesh = 0;
        let totalUpgradeProgress = 0;

        operations.forEach((operation) => {
          totalSellerFiber += operation.sellerFiber;
          totalSellerTV += operation.sellerTV;
          totalEasyMesh += operation.easyMesh;
          totalUpgradeProgress += operation.upgradeProgress;
        });

        averagesByDate[date] = {
          totalSellerFiber: totalSellerFiber,
          totalSellerTV: totalSellerTV,
          totalEasyMesh: totalEasyMesh,
          totalUpgradeProgress: totalUpgradeProgress,
        };
      }

      res.send(averagesByDate);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

    app.get("/api/incrementalOperationPerAgent", guard, async (req, res) => {
      try {
        const { userId } = getLoggedUserId(req, res);

        if (!userId) {
          return res.status(403).json({ message: "User not authorized" });
        }

        const user = await User.findById(userId);

        const incrementalOperations = await IncrementalOperation.find({
          teamName:user.teamName,
        });

        if (!incrementalOperations || incrementalOperations.length === 0) {
          return res.json({ message: "לא נמצא תפעול מצטבר של החודש הזה" });
        }
        res.send(incrementalOperations);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    });

  app.get("/api/dailyOperatingAverageSale", guard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      let dailyOperations = await DailyOperationSale.find({ user_id: userId });

      if (!dailyOperations || dailyOperations.length === 0) {
        return res.json({ message: "" });
      }

      dailyOperations = dailyOperations.map((operation) => ({
        ...operation._doc,
        date: new Date(operation.createTime).toLocaleDateString("en-US"),
      }));

      const operationsByDate = dailyOperations.reduce((groups, operation) => {
        const date = operation.date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(operation);
        return groups;
      }, {});

      const averagesByDate = {};
      for (const date in operationsByDate) {
        const operations = operationsByDate[date];
        let totalSellerFiber = 0;
        let totalSellerTV = 0;
        let totalEasyMesh = 0;
        let totalUpgradeProgress = 0;

        operations.forEach((operation) => {
          totalSellerFiber += operation.sellerFiber;
          totalSellerTV += operation.sellerTV;
          totalEasyMesh += operation.easyMesh;
          totalUpgradeProgress += operation.upgradeProgress;
        });

        averagesByDate[date] = {
          totalSellerFiber: totalSellerFiber,
          totalSellerTV: totalSellerTV,
          totalEasyMesh: totalEasyMesh,
          totalUpgradeProgress: totalUpgradeProgress,
        };
      }

      res.send(averagesByDate);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  app.get("/api/incrementalOperatingAverageSale", guard, async (req, res) => {
    try {
      const { userId } = getLoggedUserId(req, res);

      if (!userId) {
        return res.status(403).json({ message: "User not authorized" });
      }

      let incrementalOperations = await IncrementalOperationSale.find({
        user_id: userId,
      });

      if (!incrementalOperations || incrementalOperations.length === 0) {
        return res.json({ message: "" });
      }

      incrementalOperations = incrementalOperations.map((operation) => ({
        ...operation._doc,
        monthYear: new Date(operation.createTime).toLocaleDateString("en-US", {
          month: "2-digit",
          year: "numeric",
        }),
      }));

      const operationsByMonth = incrementalOperations.reduce(
        (groups, operation) => {
          const monthYear = operation.monthYear;
          if (!groups[monthYear]) {
            groups[monthYear] = [];
          }
          groups[monthYear].push(operation);
          return groups;
        },
        {}
      );

      const averagesByMonth = {};
      for (const monthYear in operationsByMonth) {
        const operations = operationsByMonth[monthYear];
        let totalSellerFiber = 0;
        let totalSellerTV = 0;
        let totalEasyMesh = 0;
        let totalUpgradeProgress = 0;

        operations.forEach((operation) => {
          totalSellerFiber += operation.sellerFiber;
          totalSellerTV += operation.sellerTV;
          totalEasyMesh += operation.easyMesh;
          totalUpgradeProgress += operation.upgradeProgress;
        });

        averagesByMonth[monthYear] = {
          totalSellerFiber: totalSellerFiber,
          totalSellerTV: totalSellerTV,
          totalEasyMesh: totalEasyMesh,
          totalUpgradeProgress: totalUpgradeProgress,
        };
      }

      res.send(averagesByMonth);
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
        return res.json({ message: "אין מכירות לחודש המצטבר כרגע." });
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

      const user = await User.findById(userId);
      console.log(user);

      if (user.teamName && user.IsBusiness) {
        const dailyOperationTeamSale = await DailyOperationSale.find({
          teamName: user.teamName,
        });

        if (!dailyOperationTeamSale || dailyOperationTeamSale.length === 0) {
          return res.json({ message: `לא נמצאו מכירות לצוות ${user.teamName}`});
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

      const user = await User.findById(userId);
      console.log(user);

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
        return res.json({
          message: `לא נמצא תפעול יום , יש ללחוץ "התחל נתונים"`,
        });
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
        return res.json({ message: "לא נמצאו מכירות להיום !" });
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
