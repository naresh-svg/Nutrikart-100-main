# 📧 Email Verification Setup Guide

## 🔧 **Supabase Configuration Required**

### **Step 1: Configure Email Settings in Supabase**

1. **Go to your Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Open your project: `knbwwhsrsszrhrcsgvxg`

2. **Navigate to Authentication > Settings:**
   - Click on "Authentication" in the left sidebar
   - Click on "Settings" tab

3. **Configure Email Settings:**
   - **Enable Email confirmations**: ✅ Check this box
   - **Site URL**: Set to your domain (e.g., `https://yourdomain.com` or `http://localhost:3000` for local testing)
   - **Redirect URLs**: Add your verification success page URL:
     ```
     https://yourdomain.com/verify-success.html
     http://localhost:3000/verify-success.html
     ```

### **Option A: Direct Dashboard Redirect**
- Users click email link → Redirected directly to dashboard
- No intermediate pages
- Faster user experience
- Use `auth-callback.html` as redirect URL

### **Option B: Verification Success Page (Current Setup)**
- Users click email link → See success page → Click to continue
- More user-friendly messages
- Professional onboarding experience
- Use `verify-success.html` as redirect URL

### **Step 2: Email Template Configuration**

1. **Go to Authentication > Email Templates:**
   - Click on "Email Templates" tab
   - Select "Confirm signup" template

2. **Update the Email Template:**
   ```html
   <h2>Confirm your signup</h2>
   
   <p>Follow this link to confirm your user:</p>
   <p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
   
   <p>After clicking the link, you'll be redirected to your NutriKart dashboard.</p>
   ```

### **Step 3: Test the Flow**

1. **Create a new account:**
   - Go to `signup.html`
   - Fill in the registration form
   - Submit the form

2. **Check email verification:**
   - You should see a message: "Check your email and click the verification link"
   - Check your email for the verification link

3. **Click verification link:**
   - Click the link in your email
   - You should be redirected to `verify-success.html`
   - Click "Continue to Dashboard" to access your account

## 🎯 **What Happens Now:**

### **Registration Flow (Direct Redirect):**
1. ✅ User fills signup form
2. ✅ Account created in Supabase
3. ✅ Verification email sent
4. ✅ User sees "Check your email" message
5. ✅ User clicks email verification link
6. ✅ Redirected to `auth-callback.html` (brief loading)
7. ✅ User data created in database
8. ✅ Automatically redirected to main dashboard

### **Registration Flow (Success Page):**
1. ✅ User fills signup form
2. ✅ Account created in Supabase
3. ✅ Verification email sent
4. ✅ User sees "Check your email" message
5. ✅ User clicks email verification link
6. ✅ Redirected to `verify-success.html`
7. ✅ User sees success message
8. ✅ User clicks "Continue to Dashboard"
9. ✅ Redirected to main dashboard

### **Files Created/Updated:**
- ✅ `signup.html` - Updated with email verification handling
- ✅ `verify-success.html` - Verification success page (Option B)
- ✅ `auth-callback.html` - Direct redirect handler (Option A)
- ✅ `EMAIL_VERIFICATION_SETUP.md` - This setup guide

## 🔧 **Configuration Options:**

### **Option 1: Enable Email Verification (Recommended)**
- Users must verify email before accessing the app
- More secure and professional
- Prevents fake accounts

### **Option 2: Disable Email Verification (For Testing)**
- Go to Authentication > Settings
- Uncheck "Enable email confirmations"
- Users can access immediately after signup

## 🚀 **Testing Your Setup:**

1. **Test with real email:**
   - Use your actual email address
   - Check spam folder if email doesn't arrive
   - Click the verification link

2. **Test the redirect:**
   - After clicking verification link
   - Should redirect to `verify-success.html`
   - Then to main dashboard

3. **Test login after verification:**
   - Try logging in with verified account
   - Should work normally

## 🛠️ **Troubleshooting:**

### **Email not received:**
- Check spam/junk folder
- Verify email address is correct
- Check Supabase email settings

### **Verification link not working:**
- Check redirect URLs in Supabase settings
- Ensure `verify-success.html` is accessible
- Check browser console for errors

### **User data not created:**
- Check Supabase logs for errors
- Verify database schema is set up
- Check RLS policies

Your NutriKart app now has professional email verification! 🎉
