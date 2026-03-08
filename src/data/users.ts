export const users = {
  valid: {
    username: process.env.VALID_USERNAME || 'default-username',
    password: process.env.VALID_PASSWORD || 'default-password',
    displayName: process.env.VALID_DISPLAY_NAME || 'Admin User',
  },
  invalidPassword: {
    username: process.env.VALID_USERNAME || 'default-username',
    password: 'invalid-password',
  },
  unregisteredEmail: {
    username: 'unregistered@tempo.com',
    password: 'some-password',
  },
  newAccount: {
    name: `Automation User ${Date.now()}`,
    organization: 'Test Org',
    username: `newuser+${Date.now()}@tempo.com`,
    password: 'ValidPassword123!',
  },
  duplicateEmail: {
    name: 'Test User',
    organization: 'Test Org',
    username: process.env.VALID_USERNAME || 'default-username',
    password: 'ValidPassword123!',
  },
  passwordRecovery: {
    username: 'nairdacool@hotmail.com',
  },
  deactivated: {
    username: 'deactivatedaccount@tempo.com',
    password: '1421Cool*',
  },
};
