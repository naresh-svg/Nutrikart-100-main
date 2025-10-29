-- NutriKart Database Schema for Supabase
-- Run these commands in your Supabase SQL Editor

-- Note: auth.users is managed by Supabase and doesn't need RLS modification

-- Create user_data table
CREATE TABLE IF NOT EXISTS user_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  email TEXT,
  goal TEXT,
  budget INTEGER DEFAULT 1000,
  cart JSONB DEFAULT '[]',
  weekly_plan JSONB DEFAULT '{}',
  reviews JSONB DEFAULT '[]',
  ingredients JSONB DEFAULT '[]',
  recipe_ingredients JSONB DEFAULT '[]',
  daily_calories INTEGER DEFAULT 0,
  target_calories INTEGER DEFAULT 2000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create groceries table
CREATE TABLE IF NOT EXISTS groceries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  img TEXT,
  tags JSONB DEFAULT '[]',
  protein DECIMAL,
  carbs DECIMAL,
  fats DECIMAL,
  fiber DECIMAL,
  calories INTEGER,
  category TEXT,
  goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meals table
CREATE TABLE IF NOT EXISTS meals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ingredients JSONB NOT NULL,
  time TEXT,
  servings INTEGER,
  calories INTEGER,
  instructions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE groceries ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only access their own data
CREATE POLICY "Users can view own data" ON user_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON user_data
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" ON user_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Groceries are public (read-only for all users)
CREATE POLICY "Groceries are viewable by everyone" ON groceries
  FOR SELECT USING (true);

-- Meals are public (read-only for all users)
CREATE POLICY "Meals are viewable by everyone" ON meals
  FOR SELECT USING (true);

-- Reviews are public (read-only for all users)
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_data_user_id ON user_data(user_id);
CREATE INDEX IF NOT EXISTS idx_groceries_goal ON groceries(goal);
CREATE INDEX IF NOT EXISTS idx_groceries_category ON groceries(category);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);

-- Insert sample grocery data
INSERT INTO groceries (name, price, img, tags, protein, carbs, fats, fiber, calories, category, goal) VALUES
-- Weight Loss Groceries
('Chicken Breast', 250, 'https://img.icons8.com/color/96/000000/chicken.png', '["Lean Protein"]', 25, 0, 3, 0, 120, 'proteins', 'weight-loss'),
('Egg Whites', 150, 'https://img.icons8.com/color/96/000000/egg.png', '["Low Fat"]', 11, 1, 0, 0, 50, 'proteins', 'weight-loss'),
('Brown Rice', 80, 'https://img.icons8.com/color/96/000000/rice.png', '["Whole Grain"]', 3, 45, 1, 4, 200, 'carbs', 'weight-loss'),
('Quinoa', 200, 'https://img.icons8.com/color/96/000000/grain.png', '["High Fiber"]', 8, 39, 3, 5, 220, 'carbs', 'weight-loss'),
('Spinach', 40, 'https://img.icons8.com/color/96/000000/spinach.png', '["Low Calorie"]', 3, 4, 0, 2, 25, 'vegetables', 'weight-loss'),
('Broccoli', 60, 'https://img.icons8.com/color/96/000000/broccoli.png', '["Fiber"]', 3, 6, 0, 3, 30, 'vegetables', 'weight-loss'),
('Apples', 100, 'https://img.icons8.com/color/96/000000/apple.png', '["Fiber"]', 0, 25, 0, 4, 95, 'fruits', 'weight-loss'),
('Berries', 180, 'https://img.icons8.com/color/96/000000/blueberries.png', '["Antioxidants"]', 1, 12, 0, 4, 50, 'fruits', 'weight-loss'),
('Almonds', 300, 'https://img.icons8.com/color/96/000000/almond.png', '["Healthy Fat"]', 6, 6, 14, 4, 160, 'snacks', 'weight-loss'),
('Greek Yogurt', 120, 'https://img.icons8.com/color/96/000000/yogurt.png', '["Protein"]', 15, 6, 0, 0, 100, 'snacks', 'weight-loss'),

-- Muscle Gain Groceries
('Lean Beef', 350, 'https://img.icons8.com/color/96/000000/meat.png', '["High Protein"]', 26, 0, 15, 0, 250, 'proteins', 'muscle-gain'),
('Tofu', 120, 'https://img.icons8.com/color/96/000000/tofu.png', '["Plant Protein"]', 10, 2, 6, 1, 94, 'proteins', 'muscle-gain'),
('Oats', 90, 'https://img.icons8.com/color/96/000000/oatmeal.png', '["Energy"]', 5, 27, 3, 4, 150, 'carbs', 'muscle-gain'),
('Sweet Potato', 70, 'https://img.icons8.com/color/96/000000/sweet-potato.png', '["Complex Carb"]', 2, 27, 0, 4, 112, 'carbs', 'muscle-gain'),
('Kale', 50, 'https://img.icons8.com/color/96/000000/kale.png', '["Micronutrients"]', 2, 7, 1, 1, 35, 'vegetables', 'muscle-gain'),
('Bell Peppers', 60, 'https://img.icons8.com/color/96/000000/bell-pepper.png', '["Vitamin C"]', 1, 7, 0, 3, 30, 'vegetables', 'muscle-gain'),
('Bananas', 60, 'https://img.icons8.com/color/96/000000/banana.png', '["Potassium"]', 1, 27, 0, 3, 105, 'fruits', 'muscle-gain'),
('Oranges', 80, 'https://img.icons8.com/color/96/000000/orange.png', '["Vitamin C"]', 1, 15, 0, 3, 60, 'fruits', 'muscle-gain'),
('Peanut Butter', 200, 'https://img.icons8.com/color/96/000000/peanut-butter.png', '["Calorie Dense"]', 8, 8, 16, 2, 190, 'snacks', 'muscle-gain'),
('Protein Bar', 150, 'https://img.icons8.com/color/96/000000/protein-bar.png', '["Convenient"]', 20, 25, 8, 3, 240, 'snacks', 'muscle-gain'),

-- Healthy Living Groceries
('Paneer', 200, 'https://img.icons8.com/color/96/000000/cheese.png', '["Calcium"]', 18, 3, 20, 0, 265, 'proteins', 'healthy-living'),
('Lentils', 100, 'https://img.icons8.com/color/96/000000/lentils.png', '["Plant Protein"]', 9, 20, 0, 8, 115, 'proteins', 'healthy-living'),
('Whole Wheat Bread', 50, 'https://img.icons8.com/color/96/000000/bread.png', '["Fiber"]', 4, 12, 1, 2, 70, 'carbs', 'healthy-living'),
('Millets', 90, 'https://img.icons8.com/color/96/000000/grain.png', '["Low GI"]', 4, 23, 1, 1, 119, 'carbs', 'healthy-living'),
('Carrots', 40, 'https://img.icons8.com/color/96/000000/carrot.png', '["Vitamin A"]', 1, 10, 0, 3, 41, 'vegetables', 'healthy-living'),
('Cucumber', 30, 'https://img.icons8.com/color/96/000000/cucumber.png', '["Hydration"]', 1, 4, 0, 1, 16, 'vegetables', 'healthy-living'),
('Papaya', 70, 'https://img.icons8.com/color/96/000000/papaya.png', '["Digestion"]', 1, 11, 0, 2, 43, 'fruits', 'healthy-living'),
('Mango', 120, 'https://img.icons8.com/color/96/000000/mango.png', '["Vitamin C"]', 1, 25, 0, 3, 99, 'fruits', 'healthy-living'),
('Trail Mix', 250, 'https://img.icons8.com/color/96/000000/trail-mix.png', '["Balanced"]', 7, 20, 12, 3, 200, 'snacks', 'healthy-living'),
('Coconut Water', 80, 'https://img.icons8.com/color/96/000000/coconut.png', '["Hydration"]', 1, 9, 0, 0, 45, 'snacks', 'healthy-living');

-- Insert sample meal data
INSERT INTO meals (name, ingredients, time, servings, calories, instructions) VALUES
('Chicken Rice', '["Chicken Breast", "Brown Rice"]', '30 mins', 2, 450, '["Cook rice in water", "Grill chicken breast", "Season with herbs", "Serve together"]'),
('Egg Spinach Omelette', '["Egg Whites", "Spinach"]', '15 mins', 1, 120, '["Beat eggs", "Heat pan with oil", "Add spinach", "Pour eggs and fold", "Cook until done"]'),
('Tofu Stir Fry', '["Tofu", "Bell Peppers"]', '20 mins', 2, 200, '["Cut tofu into cubes", "Heat wok", "Add tofu and peppers", "Stir fry for 10 mins", "Add soy sauce"]'),
('Oats Banana Breakfast', '["Oats", "Bananas"]', '10 mins', 1, 255, '["Boil water", "Add oats", "Cook for 5 mins", "Top with banana slices", "Add honey"]'),
('Paneer Spinach Curry', '["Paneer", "Spinach"]', '25 mins', 2, 350, '["Blanch spinach", "Blend spinach", "Cook paneer cubes", "Add spinach paste", "Simmer 10 mins"]'),
('Lentil Soup', '["Lentils", "Carrots"]', '35 mins', 3, 200, '["Soak lentils", "Boil with water", "Add chopped carrots", "Cook until soft", "Season and serve"]'),
('Quinoa Salad', '["Quinoa", "Carrots", "Cucumber"]', '20 mins', 2, 280, '["Cook quinoa", "Chop vegetables", "Mix in bowl", "Add olive oil dressing", "Toss well"]'),
('Grilled Vegetables', '["Broccoli", "Bell Peppers", "Carrots"]', '15 mins', 2, 120, '["Cut vegetables", "Heat grill", "Grill each vegetable", "Season with herbs", "Serve hot"]'),
('Protein Smoothie', '["Greek Yogurt", "Berries", "Bananas"]', '5 mins', 1, 250, '["Add yogurt to blender", "Add berries and banana", "Blend until smooth", "Pour and serve"]'),
('Almonds Trail Mix', '["Almonds", "Berries"]', '2 mins', 1, 300, '["Mix almonds", "Add dried berries", "Store in container", "Enjoy as snack"]');
