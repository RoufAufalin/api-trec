const axios = require('axios')
const db = require('../connection/connection.js');

const predict = async (req, res) => {
  try {
    const { text } = req.body
    const city = req.query.kota
    const apiurl = "https://api-ml-trec-im2d257paa-et.a.run.app/predict_text";
    
    // Make a POST request using Axios
    const getRecommendation = await axios.post(apiurl, {
      text: text  
    });
    
    // Send the response back to the client
    const { prediction }  = getRecommendation.data

    let query = `SELECT * FROM tourism_with_id  WHERE Category LIKE '%${prediction}%'`;

    if (city) {
      query += ` AND LOWER(City) LIKE LOWER('%${city}%')`;
    }

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    
      if (results.length === 0) {
        return res.status(404).json({ 
          rekomendasi: prediction,
          message: 'Data Tidak ditemukan' });
      }

      res.json({
        rekomendasi: prediction,
        destinasi: results
      });
    })

  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports=predict