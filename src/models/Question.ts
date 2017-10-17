import * as mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    body: {
      index: true,
      lowercase: false,
      required: [true, "can't be blank"],
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

QuestionSchema.methods.toJSON = function(question) {
  return {
    body: this.body
  };
};

export default mongoose.model("Question", QuestionSchema);
