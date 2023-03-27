const mongoose = require('mongoose')


const connectionString = 'mongodb+srv://vkpatel007:Jupiter9@nodeexpressprojects.mfylula.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority'

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to the db...'))
  .catch((err) => console.log(err))