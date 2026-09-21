import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      default: "General",
    },
    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    readingTime: {
      type: String,
      default: "4 min read",
    },
    publishedAt: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Prevent model overwrite error during Next.js hot reloading
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
