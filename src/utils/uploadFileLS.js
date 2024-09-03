import fs from 'node:fs/promises';
import path from 'node:path';
import { UPLOAD_DIR } from '../constants/index.js';

export const uploadFileLS = async (file) => {
const content = await fs.readFile(file.path);
const newPath = path.join(UPLOAD_DIR, file.filename);
await fs.writeFile(newPath, content);
await fs.unlink(file.path);

const url = `/uploads/${file.filename}`;

return url;
};
