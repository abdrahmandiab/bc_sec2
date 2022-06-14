const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.json({ msg: 'Welcome to Security App...' }));

app.use('/api/utils', require('./routes/route'));

// if (process.env.NODE_ENV === "production") {
//     // Set static folder
//     app.use(express.static("client/build"));

//     app.get("*", (req, res) =>
//       res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//     );
//   }

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
