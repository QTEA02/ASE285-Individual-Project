const { scryptSync } = require('crypto');
const utility = require('./utility');

function login(email, password, users) {
    const user = users.find(v => v.email === email);
    if (!user) {
        // User not found
        return false;
    }

    // Check if the password is empty or not provided
    if (!password) {
        return false;
    }

    // Split the stored password to extract salt and hashed password
    const [salt, hashedPassword] = user.password.split(':');

    // Hash the provided password with the same salt
    const hashedInputPassword = scryptSync(password, salt, 64).toString('hex');

    // Check if the hashed input password matches the stored hashed password
    return hashedInputPassword === hashedPassword;
}

// Read the encrypted user data from users.txt using the readJson function.
const encryptedUsers = utility.readJson('password.enc.txt');
const [, , filename, email, password] = process.argv;
console.log(login(email, password, encryptedUsers)); //updated for version 1 and final


// Test cases
//console.log(login('henry.taylor@edu.com', 'educatorbest', encryptedUsers)); // true
//console.log(login('sm.cho@hello.com', '123', encryptedUsers)); // false
//console.log(login('noname@hello.com', '1234', encryptedUsers)); // false
//console.log(login('alan.may@best.com', '', encryptedUsers)); // false
