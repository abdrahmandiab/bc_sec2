const express = require('express');

const app = express();
app.get('/', (req, res)=> res.json({msg: 'Welcome to Shiphaly task API...'}));

app.use('/api/countries', require('./routes/countries'));

// if (process.env.NODE_ENV === "production") {
//     // Set static folder
//     app.use(express.static("client/build"));
  
//     app.get("*", (req, res) =>
//       res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//     );
//   }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
