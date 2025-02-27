import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    CompanyName: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      required: true,
    },
    Salery: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Jobs || mongoose.model("Jobs", JobSchema);
