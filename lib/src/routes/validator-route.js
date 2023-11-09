"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_service_1 = require("../services/validator-service");
const validatorRouter = (0, express_1.Router)();
exports.default = validatorRouter.get('/validate', async (req, res) => {
    console.log('beginning Validation');
    if (req.body == undefined) {
        return 400;
    }
    const result = await (0, validator_service_1.validateJiraTicket)(req.body);
    if (result !== 201) {
        res.send('Jira ticket is valid');
    }
    else {
        res.send('Jira ticket is not valid');
    }
});
//# sourceMappingURL=validator-route.js.map