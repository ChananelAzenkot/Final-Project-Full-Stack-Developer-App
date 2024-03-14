import mongoose, { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;
// create a new card schema //
const schema = new Schema({
  nameAgent: String,
  numberCalls: String,
  productivity: String,
  tvDisconnection: String,
  fiberDisconnection: String,
  simurFiber: String,
  simurTV: String,
  sellerFiber: Number,
  sellerTV: Number,
  easyMesh: Number,
  upgradeProgress: Number,
  satisfaction: String,
  targets: String,
  image: {
    url: { type: String },
    alt: { type: String },
    _id: { type: ObjectId, default: () => new mongoose.Types.ObjectId() },
  },
  bizNumber: Number,
  teamName: String,
  user_id: { type: ObjectId },
  createTime: { type: Date, default: Date.now() },
});

const LoggersOperationSchema = new Schema({
  timestamp: Date,
  userId: String,
  method: String,
  path: String,
  body: Schema.Types.Mixed,
});

schema.statics.generateUniqueBizNumber = async function () {
  let bizNumber;

  while (true) {
    bizNumber = Math.floor(100000000 + Math.random() * 900000000); // 

    const exists = await this.findOne({ bizNumber });

    if (!exists) break; 
  }

  return bizNumber;
};

export const IncrementalOperation = mongoose.model("incrementalOperations", schema);
export const DailyOperation = mongoose.model("dailyOperation", schema);
export const LoggersOperation = mongoose.model(
  "loggersOperation",LoggersOperationSchema);
