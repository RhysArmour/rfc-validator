const express = require('express');
import validatorRoute from './routes/validator-route';

const app = express();
const port = process.env.PORT || 3000;;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
