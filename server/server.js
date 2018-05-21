const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const axios = require('axios');

app.use(cors());
app.get('/coindata/:name', async (req, res, next) => {
  try {
    const response = await axios.get(`https://api.coinmarketcap.com/v1/ticker/${req.params.name}`);
    console.log('Coinmarketcap', response.data);
    res.json(response.data)
  } catch (error) {
    res.status(500).json({error})
  }
});

app.use(express.static(publicPath));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
  console.log('Server is up!');
});
