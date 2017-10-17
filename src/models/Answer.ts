import * as mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    body: String,
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" }
  },
  { timestamps: true }
);

// Requires population of question
AnswerSchema.methods.toJSONFor = function(question) {
  return {
    body: this.body,
    createdAt: this.createdAt,
    id: this._id,
    question: this.question.toJSON(question)
  };
};

export default mongoose.model("Answer", AnswerSchema);
