const app = require('./app')



const port = process.env.port || 5000


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})