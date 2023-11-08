import express from 'express'
const app = express()
const port = 3000
import { validateJiraTicket } from './services/validator-service'

app.use(express.json());
app.get('/validate', async (req, res) => {
  console.log('beginning Validation')

  if(req.body === undefined){
      res.send(400);
}
console.log('GHOSTSSSSSSSSSSSS');
  const result = await validateJiraTicket(req.body) 
  console.log('HEYYYYYY HERE IS THE RESULT', result);

if (result !== 201) {
  res.send('Jira ticket is valid');
} else {
  res.send('Jira ticket is not valid');
}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})