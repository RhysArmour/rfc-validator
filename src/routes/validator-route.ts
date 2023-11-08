import { Request, Response, Router } from 'express';
import { ValidatorService } from '../services/validator-service';

const validatorRouter: Router = Router();

export default validatorRouter.get('/validate', async (req: Request, res: Response) => {

    if(req.body == undefined){
        return 400
 }
    const result = await ValidatorService.validateJiraTicket(req.body) 

  if (result !== 201) {
    res.send('Jira ticket is valid');
  } else {
    res.send('Jira ticket is not valid');
  }
});
