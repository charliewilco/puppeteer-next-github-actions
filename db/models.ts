import mongoose from "mongoose";

export interface IPerson extends mongoose.Document {
  name: string;
  age: number;
  city: string;
}

const PersonSchema = new mongoose.Schema<IPerson>({
  name: {
    /* The name of this person */

    type: String,
    required: [true, "What's your name?"],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },

  age: {
    type: Number,
  },
  city: {
    type: String,
    required: [true, "Where are you"],
  },
});

const PersonModel: mongoose.Model<IPerson> =
  mongoose.models.Person || mongoose.model<IPerson>("Person", PersonSchema);

export type ConvertedPerson = Pick<
  Pick<mongoose._LeanDocument<IPerson>, "_id" | "id" | "name" | "age" | "city">,
  "_id" | "id" | "name" | "age" | "city"
>;

export default PersonModel;
