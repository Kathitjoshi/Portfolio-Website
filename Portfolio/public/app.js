// Import Vue from CDN or local file
const Vue = window.Vue || require("vue")

// API utility for fetching data
const api = {
  async get(endpoint) {
    try {
      const response = await fetch(`/api${endpoint}`)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`API GET Error for ${endpoint}:`, error)
      throw error
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(`/api${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`API POST Error for ${endpoint}:`, error)
      throw error
    }
  },
}

// Vue Component: Navigation Bar
const NavComponent = {
  props: ["theme", "toggleTheme"], // Pass theme and toggle function
  data() {
    return {
      isMenuOpen: false,
      activeSection: "home",
      navItems: ["home", "about", "skills", "services", "projects", "contact"], // Updated nav items
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    handleScroll() {
      const scrollPosition = window.scrollY + 100

      for (const section of this.navItems) {
        const element = document.getElementById(section)
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          this.activeSection = section
          break
        }
      }
    },
    scrollTo(section) {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      this.isMenuOpen = false
    },
  },
  template: `
    <nav class="fixed top-0 w-full z-50 glass">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold gradient-text">Kathit's Portfolio</div>
                
                <!-- Desktop Menu -->
                <div class="hidden md:flex space-x-8 items-center">
                    <a v-for="item in navItems"
                       :key="item"
                       @click="scrollTo(item)"
                       :class="['cursor-pointer capitalize transition-colors duration-300', 
                               activeSection === item ? 'text-indigo-400' : 'text-gray-300 hover:text-white']">
                        {{ item }}
                    </a>
                    <!-- Theme Toggle Button -->
                    <button @click="toggleTheme" class="text-gray-300 hover:text-white transition-colors ml-4">
                        <i :class="theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"></i>
                    </button>
                </div>
                
                <!-- Mobile Menu Button -->
                <div class="flex items-center md:hidden">
                    <button @click="toggleTheme" class="text-gray-300 hover:text-white transition-colors mr-4">
                        <i :class="theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"></i>
                    </button>
                    <button @click="toggleMenu">
                        <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
                    </button>
                </div>
            </div>
            
            <!-- Mobile Menu -->
            <div v-if="isMenuOpen" class="md:hidden mt-4 pb-4">
                <a v-for="item in navItems"
                   :key="item"
                   @click="scrollTo(item)"
                   class="block py-2 capitalize cursor-pointer hover:text-indigo-400 transition-colors">
                    {{ item }}
                </a>
            </div>
        </div>
    </nav>
`,
}

// Vue Component: Hero Section
const HeroComponent = {
  props: ["profile"],
  data() {
    return {
      typedText: "",
      titles: ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Tech Innovator"],
      currentTitleIndex: 0,
      isTyping: true,
    }
  },
  mounted() {
    this.typeWriter()
    this.createParticles()
  },
  methods: {
    typeWriter() {
      const currentTitle = this.titles[this.currentTitleIndex]

      if (this.isTyping) {
        if (this.typedText.length < currentTitle.length) {
          this.typedText += currentTitle.charAt(this.typedText.length)
          setTimeout(this.typeWriter, 100)
        } else {
          setTimeout(() => {
            this.isTyping = false
            this.typeWriter()
          }, 2000)
        }
      } else {
        if (this.typedText.length > 0) {
          this.typedText = this.typedText.slice(0, -1)
          setTimeout(this.typeWriter, 50)
        } else {
          this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length
          this.isTyping = true
          setTimeout(this.typeWriter, 500)
        }
      }
    },
    createParticles() {
      const particlesContainer = document.querySelector(".particles")
      if (!particlesContainer) return

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.top = Math.random() * 100 + "%"
        particle.style.animationDelay = Math.random() * 6 + "s"
        particle.style.animationDuration = Math.random() * 3 + 3 + "s"
        particlesContainer.appendChild(particle)
      }
    },
    scrollToProjects() {
      const element = document.getElementById("projects")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    },
  },
  template: `
    <section id="home" class="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div class="particles"></div>
        
        <div class="container mx-auto px-6 text-center relative z-10">
            <div class="animate-on-scroll">
                
                
                <h1 class="hero-title text-5xl md:text-7xl font-bold mb-4">
                    {{ profile?.name || 'Kathit Joshi' }}
                </h1>
                
                <div class="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 h-8">
                    <span class="gradient-text">{{ typedText }}</span>
                    <span class="animate-pulse">|</span>
                </div>
                
                <p class="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                    {{ profile?.bio || 'A curious college student learning and finding his place in the world, Ready to collab on anything interesting.' }}
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button @click="scrollToProjects" 
                            class="btn-primary px-8 py-3 rounded-full font-semibold hover-lift">
                        View My Work
                    </button>
                    <a href="#contact" 
                       class="px-8 py-3 rounded-full border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 hover-lift">
                        Get In Touch
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <i class="fas fa-chevron-down text-2xl text-gray-400"></i>
        </div>
    </section>
`,
}

// Vue Component: About Section
const AboutComponent = {
  props: ["profile"],
  template: `
    <section id="about" class="section bg-gray-800">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16 animate-on-scroll">
                <h2 class="text-4xl font-bold mb-4 gradient-text">About Me</h2>
                <div class="w-20 h-1 bg-indigo-500 mx-auto"></div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="animate-on-scroll fade-in-left">
                    <h3 class="text-2xl font-semibold mb-6">Hello! I'm {{ profile?.name || 'Kathit Joshi' }}</h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        {{ profile?.bio || 'A curious college student learning and finding his place in the world, Ready to collab on anything interesting.' }}
                    </p>
                    <p class="text-gray-300 mb-8 leading-relaxed">
                        I love turning complex problems into simple, beautiful and intuitive solutions. 
                        When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
                        or sharing knowledge with the developer community.
                    </p>
                    
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <strong class="text-indigo-400">Email:</strong>
                            <p class="text-gray-300">{{ profile?.email || 'kathit@example.com' }}</p>
                        </div>
                        <div>
                            <strong class="text-indigo-400">Phone:</strong>
                            <p class="text-gray-300">{{ profile?.phone || '+91 9148971674' }}</p>
                        </div>
                        <div>
                            <strong class="text-indigo-400">Location:</strong>
                            <p class="text-gray-300">{{ profile?.location || 'Bangalore, Karnataka, India' }}</p>
                        </div>
                        <div>
                            <strong class="text-indigo-400">Status:</strong>
                            <p class="text-green-400">Available for hire</p>
                        </div>
                    </div>
                </div>
                
                <div class="animate-on-scroll fade-in-right">
                    <div class="glass rounded-2xl p-8">
                        <h4 class="text-xl font-semibold mb-6">Quick Facts</h4>
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <i class="fas fa-code text-indigo-400 w-6"></i>
                                <span class="ml-3">Hobbies include badminton and watching movies, TV shows, and anime.</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-project-diagram text-indigo-400 w-6"></i>
                                <span class="ml-3">5+ Projects Completed</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-users text-indigo-400 w-6"></i>
                                <span class="ml-3">200+ Leetcode Questions Solved</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-award text-indigo-400 w-6"></i>
                                <span class="ml-3">Multiple Certifications</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`,
}

// Vue Component: Skills Section
const SkillsComponent = {
  props: ["skills"],
  data() {
    return {
      animatedSkills: [],
    }
  },
  mounted() {
    this.animateSkills()
  },
  methods: {
    animateSkills() {
      setTimeout(() => {
        this.animatedSkills = (this.skills || []).map((skill) => ({
          ...skill,
          animatedLevel: skill.level,
        }))
      }, 500)
    },
    getSkillsByCategory(category) {
      return (this.skills || []).filter((skill) => skill.category === category)
    },
  },
  template: `
    <section id="skills" class="section">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16 animate-on-scroll">
                <h2 class="text-4xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
                <div class="w-20 h-1 bg-indigo-500 mx-auto"></div>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div v-for="category in ['Frontend', 'Backend', 'Database', 'Cloud', 'AI/ML/DS', 'Design', 'Documentation', 'Networking', 'Systems' , 'Algorithms', 'Version Control', 'Programming', 'Soft Skills']" 
                     :key="category"
                     class="glass rounded-xl p-6 hover-lift animate-on-scroll">
                    <h3 class="text-xl font-semibold mb-6 text-center">{{ category }}</h3>
                    
                    <div v-for="skill in getSkillsByCategory(category)" 
                         :key="skill.name"
                         class="mb-4">
                        <div class="flex justify-between mb-2">
                            <span class="text-sm font-medium">{{ skill.name }}</span>
                            <span class="text-sm text-indigo-400">{{ skill.level }}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" 
                                 :style="{ width: (animatedSkills.find(s => s.name === skill.name)?.animatedLevel || 0) + '%' }">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`,
}

// NEW Vue Component: Services Section (Replaces Testimonials)
const ServicesComponent = {
  props: ["services", "theme"],
  data() {
    return {
      selectedService: null,
      hoveredService: null
    }
  },
  mounted() {
    console.log("ServicesComponent mounted with services:", this.services)
    console.log("Services length:", this.services ? this.services.length : 0)
  },
  watch: {
    services: {
      handler(newServices) {
        console.log("Services updated:", newServices)
      },
      immediate: true
    }
  },
  methods: {
    selectService(service) {
      this.selectedService = this.selectedService === service ? null : service
    },
    getServiceIcon(iconClass) {
      return iconClass || 'fas fa-cog'
    }
  },
  template: `
    <section id="services" class="section" :class="theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16 animate-on-scroll">
                <h2 class="text-4xl font-bold mb-4 gradient-text">My Services</h2>
                <div class="w-20 h-1 bg-indigo-500 mx-auto mb-8"></div>
                <p :class="theme === 'light' ? 'text-gray-600' : 'text-gray-300'" class="max-w-2xl mx-auto">
                    I offer a comprehensive range of services to help bring your digital ideas to life with modern technologies and best practices.
                </p>
            </div>
            
           
            
            <!-- Services Grid -->
            <div v-if="services && services.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="service in services" 
                     :key="service.id"
                     class="bg-gray-700 rounded-xl p-6 text-center">
                    <div class="text-indigo-400 text-4xl mb-4">
                        <i :class="service.icon"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-white">
                        {{ service.title }}
                    </h3>
                    <p class="text-gray-300 mb-4">
                        {{ service.description }}
                    </p>
                </div>
            </div>
            
            <!-- No Services Message -->
            <div v-else class="text-center py-16">
                <div class="text-red-400 text-6xl mb-4">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 class="text-2xl font-bold text-red-400 mb-4">No Services Found</h3>
                <p class="text-gray-400">Services data: {{ JSON.stringify(services) }}</p>
            </div>
        </div>
    </section>
`,
}


// Vue Component: Projects Section
const ProjectsComponent = {
  props: ["projects"],
  data() {
    return {
      filter: "all",
    }
  },
  computed: {
    filteredProjects() {
      const projectList = this.projects || []
      if (this.filter === "all") return projectList
      if (this.filter === "featured") return projectList.filter((p) => p.featured)
      return projectList
    },
  },
  template: `
        <section id="projects" class="section bg-gray-800">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
                    <div class="w-20 h-1 bg-indigo-500 mx-auto mb-8"></div>
                    
                    <!-- Filter buttons -->
                    <div class="flex justify-center space-x-4 mb-8">
                        <button v-for="filterType in ['all', 'featured']"
                                :key="filterType"
                                @click="filter = filterType"
                                :class="['px-6 py-2 rounded-full transition-all duration-300 capitalize',
                                        filter === filterType ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white']">
                            {{ filterType }}
                        </button>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="project in filteredProjects" 
                         :key="project.id"
                         class="project-card rounded-xl overflow-hidden hover-lift">
                        <div class="relative">
                            <img :src="project.image" 
                                 :alt="project.title"
                                 class="w-full h-48 object-cover">
                            <div v-if="project.featured" 
                                 class="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-sm">
                                Featured
                            </div>
                        </div>
                        
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-3">{{ project.title }}</h3>
                            <p class="text-gray-300 mb-4">{{ project.description }}</p>
                            
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span v-for="tech in (project.technologies || [])"
                                      :key="tech"
                                      class="px-3 py-1 bg-indigo-500 bg-opacity-20 text-indigo-300 rounded-full text-sm">
                                    {{ tech }}
                                </span>
                            </div>
                            
                            <div class="flex space-x-4">
                                <a :href="project.github" 
                                   target="_blank"
                                   class="flex items-center text-gray-300 hover:text-white transition-colors">
                                    <i class="fab fa-github mr-2"></i>
                                    Code
                                </a>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
}

// Vue Component: Contact Section
const ContactComponent = {
  props: ["theme"],
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      isSubmitting: false,
      submitMessage: "",
      submitSuccess: false,
      contactEmail: "kathitjoshi@gmail.com", // Updated contact email
    }
  },
  methods: {
    async submitForm() {
      // Validate form
      if (!this.form.name || !this.form.email || !this.form.message) {
        this.submitMessage = "Please fill in all fields."
        this.submitSuccess = false
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.form.email)) {
        this.submitMessage = "Please enter a valid email address."
        this.submitSuccess = false
        return
      }

      this.isSubmitting = true
      this.submitMessage = "" // Clear previous messages
      this.submitSuccess = false

      try {
        const response = await api.post("/contact", this.form)
        this.submitMessage = response.message || "Thank you for your message! I'll get back to you soon."
        this.submitSuccess = true

        // Clear form on success
        this.form = { name: "", email: "", message: "" }

        // Show success animation
        setTimeout(() => {
          this.submitSuccess = false
        }, 3000)
      } catch (error) {
        this.submitMessage = "Error sending message. Please try again later."
        this.submitSuccess = false
        console.error("Contact form submission error:", error)
      }

      this.isSubmitting = false

      // Clear message after 7 seconds
      setTimeout(() => {
        this.submitMessage = ""
      }, 7000)
    },

    // Copy email to clipboard
    copyEmail() {
      navigator.clipboard
        .writeText(this.contactEmail)
        .then(() => {
          // You could add a toast notification here
          console.log("Email copied to clipboard")
        })
        .catch((err) => {
          console.error("Failed to copy email: ", err)
        })
    },
  },
  template: `
    <section id="contact" class="section" :class="theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16 animate-on-scroll">
                <h2 class="text-4xl font-bold mb-4 gradient-text">Get In Touch</h2>
                <div class="w-20 h-1 bg-indigo-500 mx-auto mb-8"></div>
                <p :class="theme === 'light' ? 'text-gray-600' : 'text-gray-300'" class="max-w-2xl mx-auto">
                    Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <!-- Contact Info -->
                <div class="animate-on-scroll fade-in-left">
                    <h3 class="text-2xl font-semibold mb-8" :class="theme === 'light' ? 'text-gray-900' : 'text-white'">
                        Let's Connect
                    </h3>
                    
                    <div class="space-y-6">
                        <div class="flex items-center group cursor-pointer" @click="copyEmail">
                            <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mr-4 group-hover:bg-indigo-600 transition-colors">
                                <i class="fas fa-envelope text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold" :class="theme === 'light' ? 'text-gray-900' : 'text-white'">Email</h4>
                                <p :class="theme === 'light' ? 'text-gray-600' : 'text-gray-300'" class="group-hover:text-indigo-400 transition-colors">
                                    {{ contactEmail }}
                                </p>
                            </div>
                        </div>
                        
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-phone text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold" :class="theme === 'light' ? 'text-gray-900' : 'text-white'">Phone</h4>
                                <p :class="theme === 'light' ? 'text-gray-600' : 'text-gray-300'">+91 9148971674</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-map-marker-alt text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold" :class="theme === 'light' ? 'text-gray-900' : 'text-white'">Location</h4>
                                <p :class="theme === 'light' ? 'text-gray-600' : 'text-gray-300'">Bangalore, Karnataka, India</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-clock text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold" :class="theme === 'light' ? 'text-gray-900' : 'text-white'">Response Time</h4>
                                <p :class="theme === 'light' ? 'text-gray-600' : 'text-gray-300'">Within a week</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Social Links -->
                    <div class="mt-8">
                        <h4 class="font-semibold mb-4" :class="theme === 'light' ? 'text-gray-900' : 'text-white'">Follow Me</h4>
                        <div class="flex space-x-4">
                            <a href="https://github.com/KathitJoshi" target="_blank" 
                               :class="theme === 'light' ? 'bg-gray-200 hover:bg-indigo-500 text-gray-700 hover:text-white' : 'bg-gray-700 hover:bg-indigo-500 text-white'"
                               class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="https://linkedin.com/in/kathit-joshi" target="_blank"
                               :class="theme === 'light' ? 'bg-gray-200 hover:bg-indigo-500 text-gray-700 hover:text-white' : 'bg-gray-700 hover:bg-indigo-500 text-white'"
                               class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="https://hashnode.com/@Kathit" target="_blank"
                               :class="theme === 'light' ? 'bg-gray-200 hover:bg-indigo-500 text-gray-700 hover:text-white' : 'bg-gray-700 hover:bg-indigo-500 text-white'"
                               class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <i class="fab fa-hashnode"></i>
                            </a>
                            <a href="https://www.kaggle.com/kathitjoshi" target="_blank"
                               :class="theme === 'light' ? 'bg-gray-200 hover:bg-indigo-500 text-gray-700 hover:text-white' : 'bg-gray-700 hover:bg-indigo-500 text-white'"
                               class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <i class="fab fa-kaggle"></i>
                            </a>
                            
                        </div>
                    </div>
                </div>
                
                <!-- Contact Form -->
                <div class="animate-on-scroll fade-in-right">
                    <form @submit.prevent="submitForm" 
                          class="rounded-2xl p-8 transition-all duration-300"
                          :class="theme === 'light' ? 'bg-white shadow-lg' : 'glass'">
                        <div class="mb-6">
                            <label class="block text-sm font-medium mb-2" :class="theme === 'light' ? 'text-gray-700' : 'text-gray-300'">
                                Name *
                            </label>
                            <input v-model="form.name" 
                                   type="text" 
                                   required
                                   placeholder="Your full name"
                                   :class="theme === 'light' ? 'bg-gray-50 border-gray-300 text-gray-900 focus:border-indigo-500' : 'form-input text-white'"
                                   class="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                        
                        <div class="mb-6">
                            <label class="block text-sm font-medium mb-2" :class="theme === 'light' ? 'text-gray-700' : 'text-gray-300'">
                                Email *
                            </label>
                            <input v-model="form.email" 
                                   type="email" 
                                   required
                                   placeholder="your.email@example.com"
                                   :class="theme === 'light' ? 'bg-gray-50 border-gray-300 text-gray-900 focus:border-indigo-500' : 'form-input text-white'"
                                   class="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                        
                        <div class="mb-6">
                            <label class="block text-sm font-medium mb-2" :class="theme === 'light' ? 'text-gray-700' : 'text-gray-300'">
                                Message *
                            </label>
                            <textarea v-model="form.message" 
                                      rows="5" 
                                      required
                                      placeholder="Tell me about your project..."
                                      :class="theme === 'light' ? 'bg-gray-50 border-gray-300 text-gray-900 focus:border-indigo-500' : 'form-input text-white'"
                                      class="w-full px-4 py-3 rounded-lg border resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        </div>
                        
                        <button type="submit" 
                                :disabled="isSubmitting"
                                class="btn-primary w-full py-3 rounded-lg font-semibold disabled:opacity-50 transition-all duration-300 hover:scale-105">
                            <span v-if="isSubmitting" class="flex items-center justify-center">
                                <i class="fas fa-spinner fa-spin mr-2"></i>
                                Sending...
                            </span>
                            <span v-else-if="submitSuccess" class="flex items-center justify-center">
                                <i class="fas fa-check mr-2"></i>
                                Message Sent!
                            </span>
                            <span v-else class="flex items-center justify-center">
                                <i class="fas fa-paper-plane mr-2"></i>
                                Send Message
                            </span>
                        </button>
                        
                        <transition name="fade">
                            <div v-if="submitMessage" 
                                 :class="['mt-4 p-3 rounded-lg text-center transition-all duration-300', 
                                         submitSuccess ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300']">
                                <i :class="submitSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="mr-2"></i>
                                {{ submitMessage }}
                            </div>
                        </transition>
                    </form>
                </div>
            </div>
        </div>
    </section>
`,
}

// Vue Component: Footer
const FooterComponent = {
  props: ["theme"],
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
  template: `
    <footer :class="theme === 'light' ? 'bg-gray-200 border-t border-gray-300' : 'bg-gray-900 border-t border-gray-700'" class="py-8">
        <div class="container mx-auto px-6">
          <div class="mt-4 pt-4 border-t border-opacity-20" :class="theme === 'light' ? 'border-gray-400' : 'border-gray-600'">
                <p class="text-center text-sm" :class="theme === 'light' ? 'text-gray-500' : 'text-gray-500'">
                    Built with ❤️ using Vue.js, Express.js, Node JS and MongoDB
                </p>
            </div>
        </div>
    </footer>
`,
}

// Main Vue Application Instance
Vue.createApp({
  components: {
    "nav-component": NavComponent,
    "hero-component": HeroComponent,
    "about-component": AboutComponent,
    "skills-component": SkillsComponent,
    "services-component": ServicesComponent, // NEW component
    "projects-component": ProjectsComponent,
    "contact-component": ContactComponent,
    "footer-component": FooterComponent,
  },
  data() {
    return {
      loading: true,
      profile: {},
      skills: [],
      projects: [],
      services: [],
      theme: "dark", // Default theme
      showScrollToTop: false, // For scroll-to-top button
    }
  },
  watch: {
    theme(newTheme) {
      document.body.dataset.theme = newTheme
      localStorage.setItem("theme", newTheme)
    },
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark"
    },
    handleScroll() {
      this.showScrollToTop = window.scrollY > 300 // Show button after scrolling 300px
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
    // Intersection Observer callback for animations
    handleIntersection(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target) // Stop observing once visible
        }
      })
    },
  },
  async mounted() {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      this.theme = savedTheme
    }
    document.body.dataset.theme = this.theme

    // Add scroll listener for scroll-to-top button
    window.addEventListener("scroll", this.handleScroll)

    // Set up Intersection Observer for animations
    const observer = new IntersectionObserver(this.handleIntersection, {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the element is visible
    })

    // Observe all elements with 'animate-on-scroll' class
    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element)
    })

    try {
      console.log("Loading portfolio data...")

      // Load all data with robust error handling and fallback defaults
      const [profile, skills, projects, services] = await Promise.all([
        api
          .get("/profile")
          .then((data) => {
            console.log("Profile API response:", data)
            return data
          })
          .catch((err) => {
            console.error("Profile data fetch failed:", err)
            return {
              name: "Kathit Joshi",
              title: "Full Stack Developer",
              bio: "A curious college student learning and finding his place in the world, Ready to collab on anything interesting.",
              email: "kathitjoshi@gmail.com",
              phone: "+91 9148971674",
              location: "Bangalore, Karnataka, India",
            }
          }),
        api
          .get("/skills")
          .then((data) => {
            console.log("Skills API response:", data)
            return data
          })
          .catch((err) => {
            console.error("Skills data fetch failed:", err)
            return []
          }),
        api
          .get("/projects")
          .then((data) => {
            console.log("Projects API response:", data)
            return data
          })
          .catch((err) => {
            console.error("Projects data fetch failed:", err)
            return []
          }),
        api
          .get("/services")
          .then((data) => {
            console.log("Services API response:", data)
            return data
          })
          .catch((err) => {
            console.error("Services data fetch failed:", err)
            return []
          }),
      ])

      // Clear existing test data and load real data
      this.profile = profile
      this.skills = skills
      this.projects = projects
      this.services = services

      console.log("Portfolio data loaded successfully!")
      console.log("Final Projects in Vue data:", this.projects)
      console.log("Final Services in Vue data:", this.services)
      console.log("Final Skills in Vue data:", this.skills)
    } catch (error) {
      console.error("Critical error during initial data load:", error)
    } finally {
      // Add a small delay to ensure Vue has time to update
      setTimeout(() => {
        this.loading = false
        console.log("Loading set to false, current data:", {
          projects: this.projects.length,
          services: this.services.length,
          skills: this.skills.length,
        })
      }, 100)
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  },
}).mount("#app")
