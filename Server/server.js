const express = require("express");
const mongoose = require("mongoose");
const bodtPearser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express();

dotenv.config();

//body parser middleware
app.use(bodtPearser.urlencoded({ extended: false }));
app.use(bodtPearser.json());

//DB config
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Use route
app.use("/api/users", userRoutes);
app.use('/api/admin',adminRoutes)

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on  http://localhost:${port}`);
});
