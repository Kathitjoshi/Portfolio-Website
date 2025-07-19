const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

console.log("--- Environment Variables Check ---")
console.log("NODE_ENV:", process.env.NODE_ENV)
console.log("PORT:", process.env.PORT)
console.log("MONGODB_URI:", process.env.MONGODB_URI) // This is the crucial one
console.log("---------------------------------")
console.log("MONGODB_URI:", process.env.MONGODB_URI) // This is the crucial one
console.log("---------------------------------")

const app = express()
const PORT = process.env.PORT || 3000

// MongoDB Connection
const { Contact } = require("./models/portfolio") // Import the Contact model

// Check if MONGODB_URI is defined (optional, but good for debugging)
if (!process.env.MONGODB_URI) {
  console.warn(
    "⚠️ MONGODB_URI is not defined. Contact form submissions will only be logged to console if MongoDB is not connected.",
  )
  // You might want to uncomment process.exit(1) here if MongoDB is mandatory for your app to run.
  // process.exit(1);
} else {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.error("MongoDB connection error:", err))
}

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const mockData = {
  profile: {
    name: "Kathit Joshi",
    title: "Full Stack  Developer",
    bio: "A curious college student learning and finding his place in the world, Ready to collab on anything interesting.",
    email: "kathitjoshi@gmail.com",
    phone: "+91 9148971674",
    location: "Bangalore, Karnataka, India",
  },
  skills: [
    { name: "JavaScript", level: 65, category: "Frontend" },
    { name: "Vue.js", level: 50, category: "Frontend" },
    { name: "Node.js", level: 68, category: "Backend" },
    { name: "Express.js", level: 75, category: "Backend" },
    { name: "React.js", level: 50, category: "Frontend" },
    { name: "MongoDB", level: 80, category: "Database" },
    { name: "Python", level: 75, category: "Programming" },
    { name: "AWS", level: 65, category: "Cloud" },
    { name: "Git/Github", level: 80, category: "Version Control" },
    { name: "HTML & CSS", level: 95, category: "Frontend" },
    { name: "Figma", level: 50, category: "Design" },
    { name: "Canva", level: 50, category: "Design" },
    { name: "Latex", level: 50, category: "Documentation" },
    { name: "MySQL", level: 80, category: "Database" },
    { name: "Golang", level: 50, category: "Programming" },
    { name: "Computer Networks", level: 70, category: "Networking" },
    { name: "Data Structures & Algorithms", level: 70, category: "Algorithms" },
    { name: "Operating Systems", level: 70, category: "Systems" },
    { name: "C++", level: 50, category: "Programming" },
    { name: "C", level: 40, category: "Programming" },
    { name: "AI & ML", level: 50, category: "AI/ML/DS" },
    { name: "Generative AI", level: 50, category: "AI/ML/DS" },
    { name: "Pandas", level: 50, category: "AI/ML/DS" },
    { name: "NumPy", level: 50, category: "AI/ML/DS" },
    { name: "Matplotlib", level: 50, category: "AI/ML/DS" },
    { name: "Seaborn", level: 50, category: "AI/ML/DS" },
    { name: "Scipy", level: 50, category: "AI/ML/DS" },
    { name: "Plotly", level: 50, category: "AI/ML/DS" },
    { name: "Scikit-learn", level: 50, category: "AI/ML/DS" },
    { name: "Linux", level: 60, category: "Systems" },
    { name: "REST APIs", level: 70, category: "Networking" },
    { name: "Team Collaboration", level: 80, category: "Soft Skills" },
    { name: "Communication", level: 80, category: "Soft Skills" },
    { name: "Problem Solving", level: 80, category: "Soft Skills" },
    { name: "Time Management", level: 80, category: "Soft Skills" },
    { name: "Work Ethic", level: 80, category: "Soft Skills" },
    { name: "Adaptability", level: 80, category: "Soft Skills" },
    { name: "Critical Thinking", level: 80, category: "Soft Skills" }


  ],
  projects: [
    {
      id: 1,
      title: "Hotel Management Platform",
      description:
        "Full-stack hotel management solution with real-time booking management, payment processing, and admin dashboard. Features user authentication, room booking,  responsive design.",
      technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
      image: "https://5.imimg.com/data5/SELLER/Default/2022/8/IO/ZG/AF/3150595/hotel-management-software-1000x1000.png",
      github: "https://github.com/Kathitjoshi/Hotel-Management",
      featured: true,
    },
    {
      id: 2,
      title: "GopherServe",
      description:
        "Feature-rich HTTP server with middleware chain, real-time metrics, rate limiting, and graceful shutdown. Includes responsive UI, template engine, CORS support, and comprehensive logging with TLS capabilities. Modern web service showcasing Go best practices for scalable backend development.",
      technologies: ["Golang", "Programming"],
      image: "https://res.cloudinary.com/practicaldev/image/fetch/s--dU4o3bAD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/j77a8n86mastxgjij104.png",
      github: "https://github.com/Kathitjoshi/GopherServe",
      featured: true,
    },
    {
      id: 3,
      title: "GopherRecon",
      description:
        "High-performance concurrent Go port scanner with banner grabbing, service detection, and multiple output formats. Features configurable threading, graceful shutdown, and comprehensive reporting (JSON/CSV/TXT). Perfect for network reconnaissance and security testing with real-time progress and flexible port specification..",
      technologies: ["Golang","Programming"],
      image: "https://4.bp.blogspot.com/-lK3tj7g3ZrQ/V2eny6ScDfI/AAAAAAAAAIQ/G0zld4eq0vocwZrO1tzPGEJgO1JqadPGwCLcB/s1600/4%2BBest%2BPort%2BScanner.png",
      github: "https://github.com/Kathitjoshi/GopherRecon",
      featured: true,
    },
    {
      id: 4,
      title: "BrowserCache",
      description:
        "A comprehensive Python simulation of browser caching behavior using the Least Recently Used (LRU) eviction policy. This tool helps analyze cache performance across different scenarios, cache sizes, and access patterns commonly found in web browsing.",
      technologies: ["Python","Programming"],
      image: "https://tse3.mm.bing.net/th/id/OIP.BnqV-aagdw0zHIYwSV3naAHaEE?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      github: "https://github.com/Kathitjoshi/BrowserCache",
      featured: false,
    },
    {
      id: 5,
      title: "Child_Parent_MemoryMap_BasicKernelModule",
      description:
        "A program that will create multiple child processes in which memory is allocated dynamically. While this task is executing, generate an output with the process id and the memory map of each child process in a tree structure.",
      technologies: ["C", "Linux Kernel Module"],
      image: "https://tse1.mm.bing.net/th/id/OIP.3RQ7QvDHZvnElBfqwZniEgHaEb?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      github: "https://github.com/Kathitjoshi/Child_Parent_MemoryMap_BasicKernelModule",
      featured: false,
    },
    {
      id: 6,
      title: "MoodCast",
      description:
        "An exploratory data project to examine the relationship between temperature (or other weather features) and emotional state. Using synthetic or real-world datasets, it highlights whether changes in environment (e.g., heatwaves or cold spells) correlate with fluctuations in mood scores.",
      technologies: ["Python", "Data Analysis", "Pandas", "NumPy", "Matplotlib"],
      image: "https://tse2.mm.bing.net/th/id/OIP.Rb5qATy4UjDI6zfWl9v8awHaBd?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      github: "https://github.com/Kathitjoshi/MoodCast",
      featured: true,
    },
    {
      id: 7,
      title: "LifeScope",
      description:
        "A personal data dashboard that visualizes and correlates sleep, mood, productivity, and weather. It helps uncover meaningful patterns in daily habits using interactive time-series plots and heatmaps.",
      technologies: ["Python", "Data Analysis",'AI/ML' ,"Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn" ],
      image: "https://tse3.mm.bing.net/th/id/OIP.WVyzXVdljGHs3TOAZw-TPwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      github: "https://github.com/Kathitjoshi/LifeScope",
      featured: true,
    },
    
  ],
  services: [
    {
      id: 1,
      title: "Web Development",
      description:
        "Building responsive, high-performance web applications using modern frameworks like React, Vue.js. Specializing in SEO optimization and accessibility.",
      icon: "fas fa-laptop-code",
      features: ["Responsive Design", "Performance Optimization", "SEO Ready", "Cross-browser Compatible"],
    },
    {
      id: 2,
      title: "AI/ML Development",
      description:
        "Designing and implementing machine learning models and AI solutions using Python, TensorFlow, and PyTorch. Focus on data preprocessing, model training, and deployment.",
      icon: "fas fa-brain",
      features: ["Data Preprocessing", "Data Modeling","Data Analysis" ,"Model Training", "Deployment", "AI Ethics"],
    },
    {
      id: 3,
      title: "Database Management",
      description:
        "Expertise in both SQL and NoSQL databases including MongoDB,  MySQL for scalable and efficient data storage solutions.",
      icon: "fas fa-database",
      features: ["CRUD Operations", "Data Modeling and Design Principles", "Data Integrity", "Database Administration Fundamentals"],
    },
    {
      id: 4,
      title: "UI/UX Design",
      description:
        "Crafting intuitive and engaging user interfaces for exceptional user experiences using modern design principles and tools like Figma and Canva.",
      icon: "fas fa-paint-brush",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
      id: 5,
      title: "Cloud Solutions",
      description:
        "Deploying and managing applications on cloud platforms like AWS with focus on scalability and cost optimization.",
      icon: "fas fa-cloud",
      features: ["AWS Services"],
    },
    
  ],
}

// API Routes to serve the mock data
app.get("/api/profile", (req, res) => {
  res.json(mockData.profile)
})

app.get("/api/skills", (req, res) => {
  res.json(mockData.skills)
})

app.get("/api/projects", (req, res) => {
  res.json(mockData.projects)
})

app.get("/api/services", (req, res) => {
  res.json(mockData.services)
})

// Contact form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Please fill in all fields." })
  }

  try {
    // Save to MongoDB (skip email for now)
    const newContact = new Contact({ name, email, message })
    await newContact.save()
    console.log("Contact form submission saved to DB:", newContact)

    res.json({
      success: true,
      message: "Thank you for your message! I'll get back to you soon."
    })
  } catch (error) {
    console.error("Error saving contact message to DB:", error)
    res.status(500).json({ 
      success: false, 
      message: "Error sending message. Please try again." 
    })
  }
})

// Admin endpoints for viewing messages
app.get("/api/admin/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json({ messages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    res.status(500).json({ error: "Error fetching messages" })
  }
})

app.patch("/api/admin/messages/:id", async (req, res) => {
  try {
    const { status } = req.body
    const message = await Contact.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    )
    res.json({ message })
  } catch (error) {
    console.error("Error updating message:", error)
    res.status(500).json({ error: "Error updating message" })
  }
})

// Serve the main HTML file for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 Visit http://localhost:${PORT} to view the portfolio`)
  console.log(`🎯 Press Ctrl+C to stop the server`)
})
