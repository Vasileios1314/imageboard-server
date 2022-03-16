const express = require("express");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");

const app = express();
const PORT = 4000;
const jsonParser = express.json();

app.use(jsonParser);

app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
