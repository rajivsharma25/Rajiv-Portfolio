import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      default: "Rajiv_Sharma_Resume.pdf",
    },
    contentType: {
      type: String,
      required: true,
      default: "application/pdf",
    },
    size: {
      type: Number,
      required: true,
    },
    data: {
      type: Buffer,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret.data; // Don't return binary data in JSON by default
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Resume = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

export default Resume;
