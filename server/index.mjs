import "dotenv/config";
import app from "./app.jsx";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});