import connectToDB from "./configs/db.config.js";
import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT;

const startServer = async () => {
  connectToDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running at: http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.log(`Error in startServer: ${error.message}`);
    });
};

startServer();
