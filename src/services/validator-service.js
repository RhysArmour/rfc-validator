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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJiraTicket = void 0;
const axios_1 = __importDefault(require("axios"));
function validateJiraTicket(jiraTicketURL) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('beginning validateJiraTicket');
            const response = yield axios_1.default.get(jiraTicketURL);
            if (response.status !== 200) {
                throw new Error(`Jira ticket URL is not valid: ${jiraTicketURL}`);
            }
            const { customfield_10084, customfield_10085, customfield_10053 } = response.data.fields;
            validateCustomFields({ customfield_10084, customfield_10085, customfield_10053 });
            return 201;
        }
        catch (error) {
            console.error(error);
            return 400;
        }
    });
}
exports.validateJiraTicket = validateJiraTicket;
function validateCustomFields(customFields) {
    const currentDate = new Date();
    const usernameRegex = /sb\..*\./;
    if (customFields.customfield_10084 > currentDate) {
        console.error(`customfield_10084 must not be before the current date`);
        throw new Error(`customfield_10084 must not be before the current date`);
    }
    if (!isValidDateTime(customFields.customfield_10084)) {
        console.error(`customfield_10084 is not a valid datetime`);
        throw new Error(`customfield_10084 is not a valid datetime`);
    }
    if (customFields.customfield_10085 < currentDate) {
        console.error(`customfield_10085 must not be before the current date`);
        throw new Error(`customfield_10085 must not be before the current date`);
    }
    if (!isValidDateTime(customFields.customfield_10085)) {
        console.error(`customfield_10085 is not a valid datetime`);
        throw new Error(`customfield_10085 is not a valid datetime`);
    }
    if (customFields.customfield_10085 <= customFields.customfield_10084) {
        console.error(`customfield_10085 must be after customfield_10084`);
        throw new Error(`customfield_10085 must be after customfield_10084`);
    }
    const timeDifference = customFields.customfield_10085.getTime() - customFields.customfield_10084.getTime();
    const hours = timeDifference / (1000 * 60 * 60);
    if (hours > 14) {
        console.error(`customfield_10085 must not be more than 14 hours after customfield_10084`);
        throw new Error(`customfield_10085 must not be more than 14 hours after customfield_10084`);
    }
    // if (!usernameRegex.test(customFields.customfield_10053)) {
    //   console.error(`customfield_10053 must be in the format of sb.*.*`);
    //   throw new Error();
    // }
    // if (!customFields.customfield_10053.includes('username')) {
    //   console.error(`customfield_10053 must match variable "username"`);
    //   throw new Error();
    // }
    return;
}
function isValidDateTime(dateTime) {
    // Check if the date is a valid date object
    if (isNaN(dateTime.getTime())) {
        throw new Error();
    }
    // Check if the date is in the future
    if (dateTime < new Date()) {
        throw new Error();
    }
    return true;
}
