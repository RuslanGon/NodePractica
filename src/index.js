import { TEMP_UPLOAD_DIR } from './constants/index.js';
import { initMongoConection } from './db/initMongoConection.js';
// import { Student } from "./db/models/student.js";
import { startServer } from './server.js';
import { createFolderTemp } from './utils/createFolderTemp.js';

(async () => {
  await initMongoConection();
  await createFolderTemp(TEMP_UPLOAD_DIR);
  // const students = await Student.find({});
  // console.log(students);
  startServer();
})();
