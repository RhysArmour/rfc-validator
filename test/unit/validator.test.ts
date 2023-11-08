import { ValidatorService } from '../../src/services/validator-service';

jest.mock('axios');

describe('validatorService', () => {
  it('should validate a valid Jira ticket URL', async () => {
    const jiraTicketURL = 'https://jira.example.com/browse/ISSUE-12345';
    const isValid = await ValidatorService.validateJiraTicket(jiraTicketURL);

    expect(isValid).toBe(true);
  }
  )}
)