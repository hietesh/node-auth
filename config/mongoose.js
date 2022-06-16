const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost/login_app');
}

main().then(()=>{
   console.log('Mongoose DB Connected');
})
.catch(err => console.log(err));

module.exports = mongoose;