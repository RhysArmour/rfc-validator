import axios from 'axios';

export async function validateJiraTicket(jiraTicket: string): Promise<number> {
  try {
    console.log('beginning validateJiraTicket');
    const response = await axios({
      baseURL: `https://sb97digital.atlassian.net/rest/api/2/issue/${jiraTicket}`,
      method: 'get',
      headers: {
          "Content-Type": "application/json",
          'Authorization': 'Basic cmh5cy5hcm1vdXJAc2FpbnNidXJ5c2JhbmsuY28udWs6QVRBVFQzeEZmR0YwczNYbmlVcnMzeUdEazY2d3NJTHVpZk1zMXQ0dVlTN2RUM2xaLVZycHk2akw5UlJDekV1OFg0cHVhdnlyb2ZrY0JnSjB6dm5UeGZ4STBBTEM2T2NTZG1TT053NGRLMy1GcFlwOE9sdkNYdnpDVFZrMmZ4blJuZXNReEZxTFBJSWlOSnVCeUhPaUxoNW12Z1FLWW5iLTVrZGlnZndjV1V3MlhxTUQ5Z0h6VmIwPTRDQjQyOTJC',
      },
    })

    const mappedFields = {
      outageStartTime: new Date(response.data.fields.customfield_10084),
      outageEndTime: new Date(response.data.fields.customfield_10085),
      breakglassUser: response.data.fields.customfield_10053,
    };
    

    if (response.status !== 200) {
      throw new Error(`Jira ticket URL is not valid: ${jiraTicket}`);
    }

    validateCustomFields(mappedFields);

    return 201;
  } catch (error) {
    console.error(error);
    return 400;
  }
}

function validateCustomFields(customFields: any) {
  const currentDate = new Date();
  const usernameRegex = /sb\..*\./;

console.log("Checking if outageStartTime is after the current date");
if (customFields.outageStartTime < currentDate) {
  console.error(`outageStartTime must not be before the current date`);
  throw new Error(`outageStartTime must not be before the current date`);
}

console.log("Checking if outageStartTime is a valid datetime");
if (!isValidDateTime(customFields.outageStartTime)) {
  console.error(`outageStartTime is not a valid datetime`);
  throw new Error(`outageStartTime is not a valid datetime`);
}

console.log("Checking if outageEndTime is after the current date");
if (customFields.outageEndTime < currentDate) {
  console.error(`outageEndTime must not be before the current date`);
  throw new Error(`outageEndTime must not be before the current date`);
}

console.log("Checking if outageEndTime is a valid datetime");
if (!isValidDateTime(customFields.outageEndTime)) {
  console.error(`outageEndTime is not a valid datetime`);
  throw new Error(`outageEndTime is not a valid datetime`);
}

console.log("Checking if outageEndTime is after outageStartTime");
if (customFields.outageEndTime <= customFields.outageStartTime) {
  console.error(`outageEndTime must be after outageStartTime`);
  throw new Error(`outageEndTime must be after outageStartTime`);
}

console.log("Checking if outageEndTime is within 14 hours of outageStartTime");
const timeDifference = customFields.outageEndTime.getTime() - customFields.outageStartTime.getTime();
const hours = timeDifference / (1000 * 60 * 60);

if (hours > 14) {
  console.error(`outageEndTime must not be more than 14 hours after outageStartTime`);
  throw new Error(`outageEndTime must not be more than 14 hours after outageStartTime`);
}


  // if (!usernameRegex.test(customFields.breakglassUser)) {
  //   console.error(`breakglassUser must be in the format of sb.*.*`);
  //   throw new Error();
  // }

  // if (!customFields.breakglassUser.includes('username')) {
  //   console.error(`breakglassUser must match variable "username"`);
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