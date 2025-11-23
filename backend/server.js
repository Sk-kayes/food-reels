const app = require("./src/app");
const dbconnect = require("./src/db/db");

dbconnect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;