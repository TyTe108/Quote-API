const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res)=>{
    const quoteObj = {
        quote: getRandomElement(quotes)
    }     
    res.send(quoteObj);
});

app.get('/api/quotes', (req, res)=>{
    const person = req.query.person;
    let filteredQuotes;

    if(person){
        filteredQuotes = quotes.filter(quote => quote.person === person);
    }else{
        filteredQuotes = quotes;
    }
    res.send({quotes: filteredQuotes});


});

app.post('/api/quotes', (req, res)=>{
    const { quote: quoteText, person } = req.query;

    if (!quoteText || !person) {
        return res.status(400).send({ error: 'Both quote and person are required.' });
    }

    const newQuote = {
        quote: quoteText,
        person: person
    };
    quotes.push(newQuote);
    res.send({ quote: newQuote });

});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

