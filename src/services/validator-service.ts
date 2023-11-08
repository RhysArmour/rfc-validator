import axios from 'axios';

export async function validateJiraTicket(jiraTicketURL: string): Promise<number> {
  try {
    console.log('beginning validateJiraTicket');
    const response = await axios.get(jiraTicketURL);

    if (response.status !== 200) {
      throw new Error(`Jira ticket URL is not valid: ${jiraTicketURL}`);
    }

    const {customfield_10084, customfield_10085, customfield_10053} = response.data.fields
    validateCustomFields({customfield_10084, customfield_10085, customfield_10053});

    return 201;
  } catch (error) {
    console.error(error);
    return 400;
  }
}

function validateCustomFields(customFields: any) {
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

function isValidDateTime(dateTime: Date): boolean {
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