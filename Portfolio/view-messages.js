const mongoose = require('mongoose')
const { Contact } = require('./models/portfolio')
require('dotenv').config()

async function viewMessages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('📧 Contact Messages:')
    console.log('==================')
    
    const messages = await Contact.find().sort({ createdAt: -1 })
    
    if (messages.length === 0) {
      console.log('No messages yet.')
    } else {
      messages.forEach((msg, i) => {
        console.log(`${i+1}. From: ${msg.name} (${msg.email})`)
        console.log(`   Date: ${msg.createdAt.toLocaleString()}`)
        console.log(`   Message: ${msg.message}`)
        console.log(`   Status: ${msg.status}`)
        console.log('---')
      })
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

viewMessages()
