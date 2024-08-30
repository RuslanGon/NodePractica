import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password; // Удаляем пароль из возвращаемого объекта
  return obj;
};

export const User = model('users', userSchema);
