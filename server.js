const express = require("express");
const app = express();

//powershell
const Powerhell = require("node-powershell");

//allow requests
const cors = require("cors");
app.use(cors());

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const psFile = ".\\test.ps1";

app.post("/test", (req, res) => {
  res.json({
    msg: "Success!",
    data: req.body,
  });
});

app.post("/reset", (req, res) => {
  const ps = new Powerhell({
    executionPolicy: "Bypass",
    noProfile: true,
  });
  ps.addCommand(psFile);
  ps.addArgument(req.body.testArg);
  ps.addArgument(req.body.testArg2);

  ps.invoke()
    .then(() => {
      res.json({
        msg: "Executed successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: "Something is wrong",
        err: err,
      });
    });
});

app.listen(5000, () => {
  console.log("server running at port 5000");
});
