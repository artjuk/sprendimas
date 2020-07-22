import mongoose from "mongoose";

const DATABASE_URL = "mongodb://127.0.0.1:27017/bakery";

module.exports = function(app: {
  set: (arg0: string, arg1: typeof mongoose) => void;
}) {
  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.Promise = global.Promise;

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
  process.on("SIGHUP", cleanup);

  if (app) {
    app.set("mongoose", mongoose);
  }
};

function cleanup() {
  mongoose.connection.close(function() {
    process.exit(0);
  });
}
