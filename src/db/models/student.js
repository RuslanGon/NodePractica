import { Schema } from "mongoose";

export const studentSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  avgMark: { type: Number, required: true, min: 1, max: 12 },
  onDuty: { type: Boolean, default: false },
});
