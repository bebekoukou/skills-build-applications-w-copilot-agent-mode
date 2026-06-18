const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit'

export default {
  port,
  mongoUri
}
