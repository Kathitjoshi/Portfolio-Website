# 🚀 MEVN Stack Portfolio Website

A modern, futuristic portfolio website built with the MEVN stack (MongoDB, Express.js, Vue.js, Node.js) featuring glassmorphism effects, smooth animations, and responsive design.

## ✨ Features

- **Modern Design**: Futuristic UI with glassmorphism effects and smooth animations
- **Full Stack**: Complete MEVN implementation with RESTful API
- **Vue.js via CDN**: Lightweight Vue.js integration without CLI setup
- **MongoDB Ready**: Complete database schemas for portfolio data
- **Contact Form**: Functional contact form with backend processing and email sending
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized loading and smooth animations
- **Dark/Light Mode**: Toggle between dark and light themes

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, Nodemailer
- **Database**: MongoDB (with Mongoose ODM)
- **Frontend**: Vue.js 3 (via CDN), HTML5, CSS3
- **Styling**: TailwindCSS (via CDN), Custom CSS
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter, JetBrains Mono)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone or Download the project**
2. **Navigate to project directory**
   \`\`\`bash
   cd mevn-portfolio
   \`\`\`

3. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

4. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your MongoDB URI (if using) and email credentials:
   ```dotenv
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # MongoDB Connection (uncomment when ready to use real database)
   # MONGODB_URI=mongodb://localhost:27017/portfolio
   # MONGODB_URI=mongodb+srv://YOUR_DB_USERNAME:YOUR_DB_PASSWORD@cluster0.xxxx.mongodb.net/portfolio?retryWrites=true&w=majority

   # Email Configuration (for contact form - optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587 # Use 465 for SSL, 587 for TLS (recommended for Gmail)
   EMAIL_USER=your-email@gmail.com # Your sending email address
   EMAIL_PASS=your-app-password # IMPORTANT: For Gmail, use an App Password if 2FA is enabled
   CONTACT_EMAIL_RECIPIENT=kathitjoshi@gmail.com # The email address where messages will be sent
   \`\`\`
   **Note for Gmail users:** If you use Gmail, you might need to generate an "App password" instead of your regular password, especially if you have 2-Factor Authentication enabled. You can usually find this in your Google Account security settings.

5. **Start Development Server**
   \`\`\`bash
   npm start
   \`\`\`
   
   Or for development with auto-restart:
   \`\`\`bash
   npm run dev
   \`\`\`

    Or 
   \`\`\`bash
   node server.js
   \`\`\`

6. **Visit Application**
   Open http://localhost:3000 in your browser

## 📁 Project Structure

\`\`\`
mevn-portfolio/
├── server.js              # Main server file
├── models/
│   └── portfolio.js        # MongoDB schemas
├── public/
│   ├── index.html         # Main HTML file
│   ├── styles.css         # Custom CSS styles
│   └── app.js             # Vue.js application
    └── admin.html
|── view-messages.js
|── gitignore.txt
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md             # This file
\`\`\`

## 🔌 API Endpoints

- `GET /api/profile` - Get profile information
- `GET /api/skills` - Get skills data
- `GET /api/projects` - Get projects data
- `GET /api/services` - Get services data
- `POST /api/contact` - Submit contact form (sends email and saves to DB if configured)

## 🗄️ Database Setup (Optional)

The application currently uses mock data. To enable MongoDB:

1. Install MongoDB locally or use MongoDB Atlas
2. Uncomment the MongoDB connection code in `.env` and `server.js`
3. Update the `MONGODB_URI` in `.env` with your connection string.
4. The schemas are ready in `models/portfolio.js`

## 🎨 Customization

### Profile Data
Update the mock data in `server.js` or populate your MongoDB with your information.

### Styling
- Modify `public/styles.css` for custom styles
- Update TailwindCSS classes in components
- Adjust color scheme in CSS variables

### Components
Vue components are defined in `public/app.js`:
- NavComponent
- HeroComponent
- AboutComponent
- SkillsComponent
- ProjectsComponent
- ServicesComponent
- ContactComponent
- FooterComponent

## 🚀 Deployment

### Heroku
1. Create a Heroku app
2. Set environment variables (including `MONGODB_URI`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `CONTACT_EMAIL_RECIPIENT`)
3. Deploy using Git

### Vercel
1. Connect your GitHub repository
2. Configure build settings
3. Set environment variables in Vercel project settings (including `MONGODB_URI`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `CONTACT_EMAIL_RECIPIENT`)
4. Deploy automatically

### Traditional Hosting
1. Upload files to your server
2. Install Node.js dependencies
3. Start the application with PM2 or similar

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Brave (latest)



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Happy Coding! 🎉**
