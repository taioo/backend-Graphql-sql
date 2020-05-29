import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
 

dotenv.config();

if (!process.env.PORT) {
   process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);


const app = express();
app.use(cors());
app.use(express.json());

// curl -X GET http://localhost:3000
app.get('/', (req, res) => {
  return res.send('Hello World!');
});
 
app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
 
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});
 
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);