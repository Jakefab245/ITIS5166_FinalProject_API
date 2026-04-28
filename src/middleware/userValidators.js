import { body} from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js'; 

export const validateSignUp = [ 
    body('email') 
        .exists({ values: 'falsy' })
        .trim() 
        .isEmail()
        .withMessage('A valid email is required')
        .normalizeEmail(), 
    
    body('password') 
        .exists({values: 'falsy'}) 
        .isLength({min:8, max: 64}) 
        .withMessage('Password must be between 8 and 64 characters')
        .bail(), 

    body('role') 
        .optional() 
        .isIn(['USER', 'ADMIN']) 
        .withMessage('Role must be either user or admin'), 
        
    handleValidationErrors, 
];    

export const validateLogIn = [ 
    body('email') 
        .exists({ values: 'falsy' }) 
        .trim()
        .isEmail() 
        .normalizeEmail() 
        .withMessage('A valid email is required'),
    body('password') 
        .exists({values: 'falsy'}) 
        .withMessage('Password must be provided')
        .bail(), 
    handleValidationErrors, 
];

export const validateUpdateUser=[ 
    body('email') 
        .optional() 
        .trim() 
        .isEmail() 
        .withMessage('A valid email is required') 
        .normalizeEmail(), 

    body('password') 
        .optional() 
        .isLength({min:8, max: 64})
        .withMessage('Password must contain at least 8 characters and less than 64 characters') 
        .bail(),
    
    body().custom((value, {req}) => {
        const{email, password} = req.body; 
        if(email === undefined && password === undefined){ 
            throw new Error('At least one field must be provided');
        }    
        return true; 
    }), 
    handleValidationErrors 
];

export const validateUpdateRole = [ 
    body('role') 
        .exists({values: 'falsy'}) 
        .withMessage('Role is required') 
        .isIn(['ADMIN'])
        .withMessage('Role must be ADMIN'),
    
    handleValidationErrors,
];