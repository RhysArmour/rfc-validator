"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_service_1 = require("../services/validator-service");
const validatorRouter = (0, express_1.Router)();
exports.default = validatorRouter.get('/validate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body == undefined) {
        return 400;
    }
    const result = yield validator_service_1.ValidatorService.validateJiraTicket(req.body);
    if (result !== 201) {
        res.send('Jira ticket is valid');
    }
    else {
        res.send('Jira ticket is not valid');
    }
}));
