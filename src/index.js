import { initMongoConection } from "./db/initMongoConection.js";
import { Student } from "./db/models/student.js";
import { startServer } from "./server.js";

(async() => {
    await initMongoConection();
    const students = await Student.find({});
    console.log(students);
    startServer();
})();


