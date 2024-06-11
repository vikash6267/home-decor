// referralService.js

// Assuming you have a User model defined and you're using Mongoose
const  User  = require('../models/User');

// Function to generate a unique referral code based on the user's name
const generateUniqueReferralCode = async (name) => {
    // Define a function to generate a random alphanumeric string
    const generateRandomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    // Define the maximum number of attempts to generate a unique code
    const maxAttempts = 5;

    // Attempt to generate a unique referral code
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        // Generate a random string
        const randomString = generateRandomString(4); // You can adjust the length of the random string as needed

        // Concatenate the user's name with the random string
        const referralCode = name.substring(0, 3).toUpperCase() + randomString.toUpperCase();

        // Check if the generated referral code is unique
        const isUnique = await isCodeUnique(referralCode);

        // If the code is unique, return it
        if (isUnique) {
            return referralCode;
        }
    }

    // If maximum attempts are reached and a unique code cannot be generated, throw an error
    throw new Error('Unable to generate a unique referral code.');
};

// Function to check if a referral code is unique in the system
const isCodeUnique = async (referralCode) => {
    try {
        // Check if any user already has the same referral code
        const existingUser = await User.findOne({ referralCode });
        
        // If existingUser is null, the code is unique
        return !existingUser;
    } catch (error) {
        // Handle error, log it, or throw it if necessary
        console.error('Error checking referral code uniqueness:', error);
        throw error;
    }
};

module.exports = { generateUniqueReferralCode, isCodeUnique };
