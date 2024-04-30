const fs = require('fs');
const { scryptSync, randomBytes } = require('crypto');
const utility = require('../src/utility');
const { signupUsers } = require('../src/signup');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

describe('File Writing Functionality Tests', () => {

  test('Data is successfully written to a file', () => {
    const testData = [{ email: 'test1@example.com', password: 'password1' }];
    utility.writeJson('test.txt', testData);
    const fileContent = fs.readFileSync('test.txt', 'utf8');
    expect(JSON.parse(fileContent)).toEqual(testData);
  });

  test('Data is successfully read from a file', () => {
    const testData = [{ email: 'test1@example.com', password: 'password1' }];
    fs.writeFileSync('test.txt', JSON.stringify(testData));
    const data = utility.readJson('test.txt');
    expect(data).toEqual(testData);
  });

  test('Application can connect to the database', async () => {
    // Connect to the database
    await mongoose.connect(process.env.URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Wait for a brief period to allow the connection to establish
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check the connection state
    await expect(mongoose.connection.readyState).toBe(1); // 1 indicates connection success
  });

  test('Conversion algorithm is working', () => {
    
    signupUsers();

    const encryptedUsers = utility.readJson('password.enc.txt');
    const user = encryptedUsers.find(v => v.email === "sm.cho@hello.com");
    const [salt, hashedPassword] = user.password.split(':');

    const password = "123456"
    const hashedPassword2 = scryptSync(password, salt, 64).toString('hex');


    expect(hashedPassword2 == hashedPassword).toBe(true);
  });
  
  afterAll(() => {
    mongoose.disconnect();
    });

});


  
