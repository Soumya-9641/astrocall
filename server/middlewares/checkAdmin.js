// const jwt = require('jsonwebtoken');
// const Admin = require('../models/AdminCredential');

// const { TokenExpiredError } = jwt;
// const checkAdmin = async (req, res, next) => {
//   try {
//     // Extract JWT token from headers
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     // Verify JWT token
//     const decodedToken = jwt.verify(token, 'mysecret');
//     console.log(decodedToken.userId) // Replace 'your-secret-key' with your actual secret key
//     //const { email } = decodedToken;

//     // Find user in database
//     const user = await Admin.findById(decodedToken.userId);
//     console.log(user);
//     if (!user) {
//       return res.status(403).json({ message: 'Only admin is allowed to access this resource.' });
//     }

//     // Attach user details to request object
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     if (error instanceof TokenExpiredError) {
//       // Token expired
//       return res.status(401).json({ message: 'Token expired' });
//     }
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const checkSuperadmin = async (req, res, next) => {
//   try {
//     // Extract JWT token from headers
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     // Verify JWT token
//     const decodedToken = jwt.verify(token, 'mysecret'); // Replace 'your-secret-key' with your actual secret key
//     const { email } = decodedToken;

//     // Find user in database
//     const user = await Admin.findById(decodedToken.userId);
//     console.log(user)
//     if (!user || user.isSuperadmin===false) {
//       return res.status(403).json({ message: 'Only superadmin is allowed to access this resource.' });
//     }

//     // Attach user details to request object
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     if (error instanceof TokenExpiredError) {
//       // Token expired
//       return res.status(401).json({ message: 'Token expired' });
//     }
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = { checkAdmin, checkSuperadmin };