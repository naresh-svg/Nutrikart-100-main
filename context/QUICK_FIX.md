# 🚨 Quick Fix for "must be owner of table users" Error

## ❌ **The Problem**
You're getting this error: `ERROR: 42501: must be owner of table users`

## ✅ **The Solution**
Use the **simplified schema** that doesn't try to modify the `auth.users` table.

## 🔧 **Steps to Fix:**

### **Step 1: Use the Correct Schema File**
- ❌ **Don't use**: `supabase-schema.sql` 
- ✅ **Use instead**: `supabase-schema-simple.sql`

### **Step 2: Run the Simplified Schema**
1. Go to your Supabase dashboard
2. Open **SQL Editor**
3. Copy the entire content from `supabase-schema-simple.sql`
4. Paste it into the SQL Editor
5. Click **Run**

### **Step 3: Verify Success**
- You should see "Success" message
- No permission errors
- All tables created successfully

## 🎯 **Why This Happens**
- The `auth.users` table is managed by Supabase
- Regular users can't modify system tables
- The simplified schema avoids this issue
- Everything still works perfectly!

## ✅ **What You Get**
- ✅ All user data tables created
- ✅ Grocery data inserted
- ✅ Meal suggestions added
- ✅ Review system ready
- ✅ Row Level Security enabled
- ✅ No permission errors

## 🚀 **After Running the Schema**
1. Open `login.html` → Test user registration
2. Open `admin.html` → Check database statistics
3. Your NutriKart app is ready to use!

**The simplified schema gives you everything you need without the permission issues!** 🎉
