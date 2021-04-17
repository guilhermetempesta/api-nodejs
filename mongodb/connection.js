const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(e => {
    const msg = 'ERRO! Não foi possível conectar com o mongodb.';
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m');
  })