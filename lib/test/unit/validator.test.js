"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_service_1 = require("../../src/services/validator-service");
jest.mock('axios');
describe('validatorService', () => {
    it('should validate a valid Jira ticket URL', async () => {
        const jiraTicketURL = 'https://jira.example.com/browse/ISSUE-12345';
        const isValid = await (0, validator_service_1.validateJiraTicket)(jiraTicketURL);
        expect(isValid).toBe(true);
    });
});
//# sourceMappingURL=validator.test.js.map