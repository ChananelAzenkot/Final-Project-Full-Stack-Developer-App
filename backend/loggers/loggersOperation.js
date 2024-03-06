import { getLoggedUserId } from "../config/config.js";
import { LoggersOperation } from "../handlers/operation/operations.model.js";

const loggersOperations = async (req, res, next) => {
  let responseBody;
  const oldJson = res.json;

  res.json = function (data) {
    responseBody = data;
    oldJson.apply(res, arguments);
  };

  const user = getLoggedUserId(req, res);
  if (user){
    const { userId } = user;
    console.log("userId:", userId);
    console.log("method:", req.method);
    console.log("path:", req.path);
    console.log("body:", req.body);

    res.on("finish", async () => {
      console.log("responseBody:", responseBody)
      const log = new LoggersOperation({
        timestamp: new Date(),
        userId,
        method: req.method,
        path: req.path,
        body: responseBody,
      });

      try {
        const result = await log.save();
        console.log("save result:", result);
      } catch (error) {
        console.error('Error saving log:', error);
      }
    });
  }
  next();
};

export default loggersOperations;





