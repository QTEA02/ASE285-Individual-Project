const { scryptSync, randomBytes } = require('crypto');
const utility = require('./utility');
const mongoose = require("mongoose");

 //Schema
 const userSchema = new mongoose.Schema({
    email: String,
    password: String
  });
  
  const User = mongoose.model('User', userSchema);

  URI = "mongodb+srv://chocolatepudding723:hqaXdk0UD54OX0WA@cluster0.gh6s6uf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


 async function signupUsers() {
    const userData = utility.readToString('password.txt');
    const unencryptedUsers = userData.split('\n').map(line => {
    line = line.replace(/\r$/, '');
    const [email, password] = line.split(':');
    
    return { email, password };
    });
 //   console.log('unencryptedUsers:', unencryptedUsers);
    for (const { email, password } of unencryptedUsers) {
        const salt = randomBytes(16).toString('hex');
        const hashedPassword = scryptSync(password, salt, 64).toString('hex');
        await User.create({ email, password: `${salt}:${hashedPassword}` });
      }
    
      console.log('Users stored in MongoDB.');
 
 

 const encryptedUsers = unencryptedUsers.map(({ email, password }) => {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
    return { email, password: `${salt}:${hashedPassword}` };
  });
        utility.writeJson('password.enc.txt', encryptedUsers);
    }


     async function main() {
            try {
                await mongoose.connect(URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                console.log("Connected to db!");
                await signupUsers(); // Call the signupUsers function here
            } catch (error) {
                console.error("Error connecting to db:", error);
            } finally {
                mongoose.disconnect(); // Close MongoDB connection
            }
        }

      
    main();
  