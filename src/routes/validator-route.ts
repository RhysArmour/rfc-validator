import { Request, Response, Router } from 'express';
import { validateJiraTicket } from '../services/validator-service';

const validatorRouter: Router = Router();

export default validatorRouter.get('/validate', async (req: Request, res: Response) => {
    console.log('beginning Validation')

    if(req.body == undefined){
        return 400
 }
    const result = await validateJiraTicket(req.body) 

  if (result !== 201) {
    res.send('Jira ticket is valid');
  } else {
    res.send('Jira ticket is not valid');
  }
});
