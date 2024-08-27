import { initMongoConection } from "./db/initMongoConection.js";
import { startServer } from "./server.js";

(async() => {
    await initMongoConection();
    startServer();
})();


