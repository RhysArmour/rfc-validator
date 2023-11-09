"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const validator_service_1 = require("./services/validator-service");
app.use(express_1.default.json());
app.get('/validate', async (req, res) => {
    console.log('beginning Validation');
    if (req.body === undefined) {
        res.send(400);
    }
    const result = await (0, validator_service_1.validateJiraTicket)(req.body.jiraTicketUrl);
    if (result === 201) {
        res.send('Jira ticket is valid');
    }
    else {
        res.send('Jira ticket is not valid');
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map