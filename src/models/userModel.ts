import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
      phone:{
        type:String,
          required:true,
          unique:true
      }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
