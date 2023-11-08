import express from 'express'
const app = express()
const port = 3000
import { ValidatorService } from './services/validator-service'

app.use('/validate', async (req, res) => {
  console.log('beginning Validation')

  if(req.body == undefined){
      return 400
}
  const result = await ValidatorService.validateJiraTicket(req.body) 

if (result !== 201) {
  res.send('Jira ticket is valid');
} else {
  res.send('Jira ticket is not valid');
}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})