# NutriKart - Smart Grocery & Meal Planner

A comprehensive web application for smart grocery planning, meal suggestions, and nutrition tracking.

## Features

- **User Authentication**: Secure login and signup system
- **Smart Grocery Planning**: Personalized grocery recommendations based on health goals
- **Meal Suggestions**: AI-powered meal recommendations based on available ingredients
- **Recipe Generator**: Create custom recipes from your ingredients
- **Weekly Meal Planner**: Plan your meals for the entire week
- **Nutrition Tracking**: Track calories and nutritional information
- **Shopping Cart**: Manage your grocery list with budget tracking
- **Dashboard**: View your profile and progress

## Getting Started

### Demo Account
For quick testing, use the demo account:
- **Email**: demo@nutrikart.com
- **Password**: demo123

### New User Registration
1. Click "Sign up" on the login page
2. Fill in your details (username, email, password)
3. Confirm your password
4. Click "Sign Up" to create your account

### Login
1. Enter your email and password
2. Click "Login" to access your dashboard

## How to Use

1. **Set Your Goals**: Choose from Weight Loss, Muscle Gain, or Healthy Living
2. **Set Budget**: Define your weekly grocery budget
3. **Browse Groceries**: Explore recommended items based on your goals
4. **Add to Cart**: Click items to add them to your shopping list
5. **Plan Meals**: Use the Smart Meals section to get meal suggestions
6. **Track Progress**: Monitor your nutrition and spending in the Dashboard

## File Structure

- `login.html` - Login page
- `signup.html` - User registration page
- `Nutri.html` - Main application page
- `Nutri.js` - Application logic and functionality
- `Nutri.css` - Main application styles
- `login.css` - Login/signup page styles
- `admin.html` - Admin panel for database management
- `admin-setup.js` - Admin functions and utilities
- `supabase-schema.sql` - Database schema
- `supabase-config.js` - Supabase configuration
- `verify-success.html` - Email verification success page
- `EMAIL_VERIFICATION_SETUP.md` - Email verification setup guide

## Technical Details

- **Storage**: Supabase cloud database with localStorage backup
- **Authentication**: Supabase Auth with email verification
- **Email Verification**: Professional email confirmation system
- **Responsive**: Works on desktop and mobile devices
- **Backend**: Supabase for data persistence and user management
- **Admin Panel**: Database management with service key access

## Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript features
- localStorage API
- CSS Grid and Flexbox

## Troubleshooting

- **Login Issues**: Make sure you're using the correct email and password
- **Data Loss**: Data is stored in browser localStorage - clearing browser data will remove your information
- **Page Not Loading**: Ensure all files are in the same directory

## Future Enhancements

- Backend integration for data persistence
- Social features and sharing
- Advanced nutrition analytics
- Mobile app version
- Integration with grocery delivery services
