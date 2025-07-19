const mongoose = require("mongoose")

// Profile Schema
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    location: String,
    avatar: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      website: String,
    },
  },
  { timestamps: true },
)

// Skills Schema
const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    category: { type: String, required: true },
    icon: String,
  },
  { timestamps: true },
)

// Projects Schema
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [String],
    image: String,
    github: String,
    demo: String,
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["completed", "in-progress", "planned"], default: "completed" },
  },
  { timestamps: true },
)

// Testimonials Schema
const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    company: String,
    content: { type: String, required: true },
    avatar: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  { timestamps: true },
)

// Contact Messages Schema
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: String,
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: true },
)

module.exports = {
  Profile: mongoose.model("Profile", profileSchema),
  Skill: mongoose.model("Skill", skillSchema),
  Project: mongoose.model("Project", projectSchema),
  Testimonial: mongoose.model("Testimonial", testimonialSchema),
  Contact: mongoose.model("Contact", contactSchema),
}
