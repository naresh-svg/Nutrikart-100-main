# 🔗 Preview Link Setup Guide

## 🌐 **How to Set Up Your Preview Link**

### **Option 1: GitHub Pages (Free & Easy)**

1. **Create a GitHub Repository:**
   - Go to [GitHub.com](https://github.com)
   - Create a new repository
   - Upload all your NutriKart files

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Your site will be available at: `https://yourusername.github.io/your-repo-name`

### **Option 2: Netlify (Free & Professional)**

1. **Go to [Netlify.com](https://netlify.com)**
2. **Drag and drop your project folder**
3. **Get instant preview link**
4. **Your site will be available at: `https://random-name.netlify.app`**

### **Option 3: Vercel (Free & Fast)**

1. **Go to [Vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Deploy automatically**
4. **Your site will be available at: `https://your-project.vercel.app`**

## 🔧 **Supabase Configuration for Preview Links**

### **Step 1: Update Supabase Settings**

1. **Go to your Supabase Dashboard:**
   - Authentication > Settings
   - Update **Site URL** to your preview link
   - Add **Redirect URLs**:
     ```
     https://your-preview-link.com/verify-success.html
     https://your-preview-link.com/Nutri.html
     ```

### **Step 2: Update Your Files (If Needed)**

If your preview link is different from `localhost`, update these files:

1. **In `login.html`, `signup.html`, `verify-success.html`:**
   - The Supabase configuration is already set up
   - No changes needed for basic functionality

2. **For custom domains, update the redirect URLs in Supabase**

## 🚀 **Quick Setup with Netlify (Recommended)**

### **Step 1: Prepare Your Files**
- Make sure all files are in one folder
- Include all HTML, CSS, JS files
- Don't include `node_modules` or `.git` folders

### **Step 2: Deploy to Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Drag your project folder to the deploy area
3. Wait for deployment (usually 1-2 minutes)
4. Get your preview link: `https://amazing-name-123456.netlify.app`

### **Step 3: Update Supabase**
1. Go to Supabase Dashboard > Authentication > Settings
2. Set **Site URL**: `https://your-netlify-link.netlify.app`
3. Add **Redirect URLs**:
   ```
   https://your-netlify-link.netlify.app/verify-success.html
   https://your-netlify-link.netlify.app/Nutri.html
   ```

## 🎯 **Testing Your Preview Link**

### **Test the Complete Flow:**
1. **Visit your preview link**
2. **Click "Sign up"**
3. **Create an account**
4. **Check your email for verification**
5. **Click verification link**
6. **Should redirect to your NutriKart dashboard**

### **Test Login:**
1. **Try logging in without verification** → Should show error
2. **Verify email first**
3. **Login again** → Should work

## 📱 **Mobile Testing**

Your preview link will work on:
- ✅ Desktop browsers
- ✅ Mobile browsers
- ✅ Tablets
- ✅ All modern devices

## 🔧 **Troubleshooting Preview Links**

### **If verification emails don't work:**
- Check Supabase redirect URLs are correct
- Ensure your preview link is accessible
- Check spam folder for emails

### **If login doesn't work:**
- Verify Supabase Site URL is set correctly
- Check browser console for errors
- Ensure all files are uploaded correctly

### **If redirects don't work:**
- Check Supabase redirect URLs include your domain
- Verify `verify-success.html` is accessible
- Test the complete flow

## 🎉 **Your NutriKart App is Now Live!**

Once you have your preview link:
- ✅ Share with friends and family
- ✅ Test on different devices
- ✅ Show off your professional app
- ✅ Get feedback and improve

**Your NutriKart application is now a professional, live web application!** 🚀
