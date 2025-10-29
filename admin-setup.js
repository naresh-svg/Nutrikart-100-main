// Admin Setup Script for NutriKart Supabase
// This script uses the service key for administrative operations
// Run this in your browser console or as a Node.js script

const SUPABASE_URL = 'https://knbwwhsrsszrhrcsgvxg.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuYnd3aHNyc3N6cmhyY3NndnhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQwMjExNSwiZXhwIjoyMDc2OTc4MTE1fQ.LWfkW-mpB2Ib7w-322CrMSVrEINEoyZfkJqbyfZA6WY';

// Initialize Supabase client with service key
const { createClient } = supabase;
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Admin functions
const adminFunctions = {
  // Check database connection
  async testConnection() {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_data')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Connection failed:', error);
        return false;
      }
      
      console.log('✅ Database connection successful!');
      return true;
    } catch (error) {
      console.error('Connection error:', error);
      return false;
    }
  },

  // Get all users
  async getAllUsers() {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_data')
        .select('*');
      
      if (error) {
        console.error('Error fetching users:', error);
        return [];
      }
      
      console.log('Users:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  },

  // Get grocery statistics
  async getGroceryStats() {
    try {
      const { data, error } = await supabaseAdmin
        .from('groceries')
        .select('goal, category, count(*)')
        .group('goal, category');
      
      if (error) {
        console.error('Error fetching grocery stats:', error);
        return [];
      }
      
      console.log('Grocery Statistics:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  },

  // Get all reviews
  async getAllReviews() {
    try {
      const { data, error } = await supabaseAdmin
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching reviews:', error);
        return [];
      }
      
      console.log('Reviews:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  },

  // Clear all user data (use with caution!)
  async clearAllUserData() {
    if (!confirm('Are you sure you want to clear ALL user data? This cannot be undone!')) {
      return;
    }
    
    try {
      const { error } = await supabaseAdmin
        .from('user_data')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
      
      if (error) {
        console.error('Error clearing user data:', error);
        return false;
      }
      
      console.log('✅ All user data cleared!');
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  },

  // Add sample grocery items
  async addSampleGroceries() {
    const sampleGroceries = [
      {
        name: "Organic Chicken Breast",
        price: 300,
        img: "https://img.icons8.com/color/96/000000/chicken.png",
        tags: ["Organic", "Lean Protein"],
        protein: 25,
        carbs: 0,
        fats: 3,
        fiber: 0,
        calories: 120,
        category: "proteins",
        goal: "weight-loss"
      },
      {
        name: "Fresh Salmon",
        price: 500,
        img: "https://img.icons8.com/color/96/000000/fish.png",
        tags: ["Omega-3", "High Protein"],
        protein: 22,
        carbs: 0,
        fats: 12,
        fiber: 0,
        calories: 180,
        category: "proteins",
        goal: "muscle-gain"
      },
      {
        name: "Quinoa",
        price: 250,
        img: "https://img.icons8.com/color/96/000000/grain.png",
        tags: ["Complete Protein", "Gluten-Free"],
        protein: 8,
        carbs: 39,
        fats: 3,
        fiber: 5,
        calories: 220,
        category: "carbs",
        goal: "healthy-living"
      }
    ];

    try {
      const { data, error } = await supabaseAdmin
        .from('groceries')
        .insert(sampleGroceries);
      
      if (error) {
        console.error('Error adding sample groceries:', error);
        return false;
      }
      
      console.log('✅ Sample groceries added!');
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  },

  // Get database statistics
  async getDatabaseStats() {
    try {
      const [usersResult, groceriesResult, reviewsResult] = await Promise.all([
        supabaseAdmin.from('user_data').select('count', { count: 'exact' }),
        supabaseAdmin.from('groceries').select('count', { count: 'exact' }),
        supabaseAdmin.from('reviews').select('count', { count: 'exact' })
      ]);

      const stats = {
        users: usersResult.count || 0,
        groceries: groceriesResult.count || 0,
        reviews: reviewsResult.count || 0
      };

      console.log('📊 Database Statistics:', stats);
      return stats;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return null;
    }
  }
};

// Make functions available globally
window.adminFunctions = adminFunctions;

console.log('🔧 NutriKart Admin Functions Loaded!');
console.log('Available functions:');
console.log('- adminFunctions.testConnection()');
console.log('- adminFunctions.getAllUsers()');
console.log('- adminFunctions.getGroceryStats()');
console.log('- adminFunctions.getAllReviews()');
console.log('- adminFunctions.getDatabaseStats()');
console.log('- adminFunctions.addSampleGroceries()');
console.log('- adminFunctions.clearAllUserData() (⚠️ DANGEROUS)');

// Auto-test connection
adminFunctions.testConnection();
