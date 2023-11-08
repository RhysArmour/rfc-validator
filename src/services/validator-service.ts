import axios from 'axios';


export class ValidatorService {
    static async validateJiraTicket(jiraTicketURL: string): Promise<number> {
      try {
        const response = await axios.get(jiraTicketURL);
  
        if (response.status !== 200) {
          throw new Error(`Jira ticket URL is not valid: ${jiraTicketURL}`);
        }
  
        const jiraTicket = response.data;
  
        if (jiraTicket.issueType !== 'Request for Change') {
          throw new Error(`Jira ticket is not a Request for Change: ${jiraTicketURL}`);
        }
  
        if (!jiraTicket.hasOwnProperty('scheduleTab')) {
          throw new Error(`Jira ticket does not have a schedule tab: ${jiraTicketURL}`);
        }
  
        if (!jiraTicket.hasOwnProperty('breakglassTab')) {
          throw new Error(`Jira ticket does not have a breakglass tab: ${jiraTicketURL}`);
        }
  
        return 201;
      } catch (error) {
        console.error(error);
        return 400;
      }
    }
  }
  