import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
refreshToken: { type: String, required: true },
accessToken: { type: String, required: true },
refreshTokenValibUntil: { type: Date, required: true },
accessTokenValidUntil: { type: Date, required: true },
userId: { type: Schema.ObjectId, required: true, unique: true }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

sessionSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password; // Удаляем пароль из возвращаемого объекта
  return obj;
};

export const Session = model('session', sessionSchema);
