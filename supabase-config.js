// Supabase Configuration
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2'

// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Database table names
export const TABLES = {
  USERS: 'users',
  USER_DATA: 'user_data',
  GROCERIES: 'groceries',
  MEALS: 'meals',
  REVIEWS: 'reviews'
}

// Helper functions for Supabase operations
export const supabaseHelpers = {
  // User authentication
  async signUp(email, password, userData) {
    const { data, error } = await supabase.auth.login({
      email,
      password,
      options: {
        data: {
          username: userData.username,
          full_name: userData.username
        }
      }
    })
    return { data, error }
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // User data operations
  async saveUserData(userId, userData) {
    const { data, error } = await supabase
      .from(TABLES.USER_DATA)
      .upsert({
        user_id: userId,
        username: userData.username,
        email: userData.email,
        goal: userData.goal,
        budget: userData.budget,
        cart: userData.cart,
        weekly_plan: userData.weeklyPlan,
        reviews: userData.reviews,
        ingredients: userData.ingredients,
        recipe_ingredients: userData.recipeIngredients,
        daily_calories: userData.dailyCalories,
        target_calories: userData.targetCalories,
        updated_at: new Date().toISOString()
      })
    return { data, error }
  },

  async getUserData(userId) {
    const { data, error } = await supabase
      .from(TABLES.USER_DATA)
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  },

  // Grocery data operations
  async getGroceries(goal) {
    const { data, error } = await supabase
      .from(TABLES.GROCERIES)
      .select('*')
      .eq('goal', goal)
    return { data, error }
  },

  // Meal suggestions
  async getMeals(ingredients) {
    const { data, error } = await supabase
      .from(TABLES.MEALS)
      .select('*')
      .contains('ingredients', ingredients)
    return { data, error }
  },

  // Reviews
  async saveReview(userId, review) {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .insert({
        user_id: userId,
        rating: review.rating,
        text: review.text,
        created_at: new Date().toISOString()
      })
    return { data, error }
  },

  async getReviews() {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    return { data, error }
  }
}
