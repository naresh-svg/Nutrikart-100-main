// Supabase Configuration
const SUPABASE_URL = 'https://knbwwhsrsszrhrcsgvxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuYnd3aHNyc3N6cmhyY3NndnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDIxMTUsImV4cCI6MjA3Njk3ODExNX0.W0gogF-_MIzPPWv3MoN-xPUgDaQQJzGDrXhPJsl6Qpw';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Google Gemini API Configuration
const GEMINI_API_KEY = 'AIzaSyBvIJc52hb3Fp6UVfTlf1MTxZ-zyNHmD6I';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Data Storage
let userData = {
  username: "",
  email: "",
  goal: "",
  budget: 1000,
  cart: [],
  weeklyPlan: {},
  reviews: [],
  ingredients: [],
  recipeIngredients: [],
  dailyCalories: 0,
  targetCalories: 2000,
}

// Grocery Data with real images
const groceries = {
  "weight-loss": {
    proteins: [
      {
        name: "Chicken Breast",
        price: 250,
        img: "https://img.icons8.com/color/96/000000/chicken.png",
        tags: ["Lean Protein"],
        protein: 25,
        carbs: 0,
        fats: 3,
        fiber: 0,
        calories: 120,
      },
      {
        name: "Egg Whites",
        price: 150,
        img: "https://img.icons8.com/color/96/000000/egg.png",
        tags: ["Low Fat"],
        protein: 11,
        carbs: 1,
        fats: 0,
        fiber: 0,
        calories: 50,
      },
    ],
    carbs: [
      {
        name: "Brown Rice",
        price: 80,
        img: "https://img.icons8.com/color/96/000000/rice.png",
        tags: ["Whole Grain"],
        protein: 3,
        carbs: 45,
        fats: 1,
        fiber: 4,
        calories: 200,
      },
      {
        name: "Quinoa",
        price: 200,
        img: "https://img.icons8.com/color/96/000000/grain.png",
        tags: ["High Fiber"],
        protein: 8,
        carbs: 39,
        fats: 3,
        fiber: 5,
        calories: 220,
      },
    ],
    vegetables: [
      {
        name: "Spinach",
        price: 40,
        img: "https://img.icons8.com/color/96/000000/spinach.png",
        tags: ["Low Calorie"],
        protein: 3,
        carbs: 4,
        fats: 0,
        fiber: 2,
        calories: 25,
      },
      {
        name: "Broccoli",
        price: 60,
        img: "https://img.icons8.com/color/96/000000/broccoli.png",
        tags: ["Fiber"],
        protein: 3,
        carbs: 6,
        fats: 0,
        fiber: 3,
        calories: 30,
      },
    ],
    fruits: [
      {
        name: "Apples",
        price: 100,
        img: "https://img.icons8.com/color/96/000000/apple.png",
        tags: ["Fiber"],
        protein: 0,
        carbs: 25,
        fats: 0,
        fiber: 4,
        calories: 95,
      },
      {
        name: "Berries",
        price: 180,
        img: "https://img.icons8.com/color/96/000000/blueberries.png",
        tags: ["Antioxidants"],
        protein: 1,
        carbs: 12,
        fats: 0,
        fiber: 4,
        calories: 50,
      },
    ],
    snacks: [
      {
        name: "Almonds",
        price: 300,
        img: "https://img.icons8.com/color/96/000000/almond.png",
        tags: ["Healthy Fat"],
        protein: 6,
        carbs: 6,
        fats: 14,
        fiber: 4,
        calories: 160,
      },
      {
        name: "Greek Yogurt",
        price: 120,
        img: "https://img.icons8.com/color/96/000000/yogurt.png",
        tags: ["Protein"],
        protein: 15,
        carbs: 6,
        fats: 0,
        fiber: 0,
        calories: 100,
      },
    ],
  },
  "muscle-gain": {
    proteins: [
      {
        name: "Lean Beef",
        price: 350,
        img: "https://img.icons8.com/color/96/000000/meat.png",
        tags: ["High Protein"],
        protein: 26,
        carbs: 0,
        fats: 15,
        fiber: 0,
        calories: 250,
      },
      {
        name: "Tofu",
        price: 120,
        img: "https://img.icons8.com/color/96/000000/tofu.png",
        tags: ["Plant Protein"],
        protein: 10,
        carbs: 2,
        fats: 6,
        fiber: 1,
        calories: 94,
      },
    ],
    carbs: [
      {
        name: "Oats",
        price: 90,
        img: "https://img.icons8.com/color/96/000000/oatmeal.png",
        tags: ["Energy"],
        protein: 5,
        carbs: 27,
        fats: 3,
        fiber: 4,
        calories: 150,
      },
      {
        name: "Sweet Potato",
        price: 70,
        img: "https://img.icons8.com/color/96/000000/sweet-potato.png",
        tags: ["Complex Carb"],
        protein: 2,
        carbs: 27,
        fats: 0,
        fiber: 4,
        calories: 112,
      },
    ],
    vegetables: [
      {
        name: "Kale",
        price: 50,
        img: "https://img.icons8.com/color/96/000000/kale.png",
        tags: ["Micronutrients"],
        protein: 2,
        carbs: 7,
        fats: 1,
        fiber: 1,
        calories: 35,
      },
      {
        name: "Bell Peppers",
        price: 60,
        img: "https://img.icons8.com/color/96/000000/bell-pepper.png",
        tags: ["Vitamin C"],
        protein: 1,
        carbs: 7,
        fats: 0,
        fiber: 3,
        calories: 30,
      },
    ],
    fruits: [
      {
        name: "Bananas",
        price: 60,
        img: "https://img.icons8.com/color/96/000000/banana.png",
        tags: ["Potassium"],
        protein: 1,
        carbs: 27,
        fats: 0,
        fiber: 3,
        calories: 105,
      },
      {
        name: "Oranges",
        price: 80,
        img: "https://img.icons8.com/color/96/000000/orange.png",
        tags: ["Vitamin C"],
        protein: 1,
        carbs: 15,
        fats: 0,
        fiber: 3,
        calories: 60,
      },
    ],
    snacks: [
      {
        name: "Peanut Butter",
        price: 200,
        img: "https://img.icons8.com/color/96/000000/peanut-butter.png",
        tags: ["Calorie Dense"],
        protein: 8,
        carbs: 8,
        fats: 16,
        fiber: 2,
        calories: 190,
      },
      {
        name: "Protein Bar",
        price: 150,
        img: "https://img.icons8.com/color/96/000000/protein-bar.png",
        tags: ["Convenient"],
        protein: 20,
        carbs: 25,
        fats: 8,
        fiber: 3,
        calories: 240,
      },
    ],
  },
  "healthy-living": {
    proteins: [
      {
        name: "Paneer",
        price: 200,
        img: "https://img.icons8.com/color/96/000000/cheese.png",
        tags: ["Calcium"],
        protein: 18,
        carbs: 3,
        fats: 20,
        fiber: 0,
        calories: 265,
      },
      {
        name: "Lentils",
        price: 100,
        img: "https://img.icons8.com/color/96/000000/lentils.png",
        tags: ["Plant Protein"],
        protein: 9,
        carbs: 20,
        fats: 0,
        fiber: 8,
        calories: 115,
      },
    ],
    carbs: [
      {
        name: "Whole Wheat Bread",
        price: 50,
        img: "https://img.icons8.com/color/96/000000/bread.png",
        tags: ["Fiber"],
        protein: 4,
        carbs: 12,
        fats: 1,
        fiber: 2,
        calories: 70,
      },
      {
        name: "Millets",
        price: 90,
        img: "https://img.icons8.com/color/96/000000/grain.png",
        tags: ["Low GI"],
        protein: 4,
        carbs: 23,
        fats: 1,
        fiber: 1,
        calories: 119,
      },
    ],
    vegetables: [
      {
        name: "Carrots",
        price: 40,
        img: "https://img.icons8.com/color/96/000000/carrot.png",
        tags: ["Vitamin A"],
        protein: 1,
        carbs: 10,
        fats: 0,
        fiber: 3,
        calories: 41,
      },
      {
        name: "Cucumber",
        price: 30,
        img: "https://img.icons8.com/color/96/000000/cucumber.png",
        tags: ["Hydration"],
        protein: 1,
        carbs: 4,
        fats: 0,
        fiber: 1,
        calories: 16,
      },
    ],
    fruits: [
      {
        name: "Papaya",
        price: 70,
        img: "https://img.icons8.com/color/96/000000/papaya.png",
        tags: ["Digestion"],
        protein: 1,
        carbs: 11,
        fats: 0,
        fiber: 2,
        calories: 43,
      },
      {
        name: "Mango",
        price: 120,
        img: "https://img.icons8.com/color/96/000000/mango.png",
        tags: ["Vitamin C"],
        protein: 1,
        carbs: 25,
        fats: 0,
        fiber: 3,
        calories: 99,
      },
    ],
    snacks: [
      {
        name: "Trail Mix",
        price: 250,
        img: "https://img.icons8.com/color/96/000000/trail-mix.png",
        tags: ["Balanced"],
        protein: 7,
        carbs: 20,
        fats: 12,
        fiber: 3,
        calories: 200,
      },
      {
        name: "Coconut Water",
        price: 80,
        img: "https://img.icons8.com/color/96/000000/coconut.png",
        tags: ["Hydration"],
        protein: 1,
        carbs: 9,
        fats: 0,
        fiber: 0,
        calories: 45,
      },
    ],
  },
}

// Meal Database - FIXED with more meals
const mealDatabase = {
  "Chicken Rice": {
    ingredients: ["Chicken Breast", "Brown Rice"],
    time: "30 mins",
    servings: 2,
    calories: 450,
    instructions: ["Cook rice in water", "Grill chicken breast", "Season with herbs", "Serve together"],
  },
  "Egg Spinach Omelette": {
    ingredients: ["Egg Whites", "Spinach"],
    time: "15 mins",
    servings: 1,
    calories: 120,
    instructions: ["Beat eggs", "Heat pan with oil", "Add spinach", "Pour eggs and fold", "Cook until done"],
  },
  "Tofu Stir Fry": {
    ingredients: ["Tofu", "Bell Peppers"],
    time: "20 mins",
    servings: 2,
    calories: 200,
    instructions: ["Cut tofu into cubes", "Heat wok", "Add tofu and peppers", "Stir fry for 10 mins", "Add soy sauce"],
  },
  "Oats Banana Breakfast": {
    ingredients: ["Oats", "Bananas"],
    time: "10 mins",
    servings: 1,
    calories: 255,
    instructions: ["Boil water", "Add oats", "Cook for 5 mins", "Top with banana slices", "Add honey"],
  },
  "Paneer Spinach Curry": {
    ingredients: ["Paneer", "Spinach"],
    time: "25 mins",
    servings: 2,
    calories: 350,
    instructions: ["Blanch spinach", "Blend spinach", "Cook paneer cubes", "Add spinach paste", "Simmer 10 mins"],
  },
  "Lentil Soup": {
    ingredients: ["Lentils", "Carrots"],
    time: "35 mins",
    servings: 3,
    calories: 200,
    instructions: ["Soak lentils", "Boil with water", "Add chopped carrots", "Cook until soft", "Season and serve"],
  },
  "Quinoa Salad": {
    ingredients: ["Quinoa", "Carrots", "Cucumber"],
    time: "20 mins",
    servings: 2,
    calories: 280,
    instructions: ["Cook quinoa", "Chop vegetables", "Mix in bowl", "Add olive oil dressing", "Toss well"],
  },
  "Grilled Vegetables": {
    ingredients: ["Broccoli", "Bell Peppers", "Carrots"],
    time: "15 mins",
    servings: 2,
    calories: 120,
    instructions: ["Cut vegetables", "Heat grill", "Grill each vegetable", "Season with herbs", "Serve hot"],
  },
  "Protein Smoothie": {
    ingredients: ["Greek Yogurt", "Berries", "Bananas"],
    time: "5 mins",
    servings: 1,
    calories: 250,
    instructions: ["Add yogurt to blender", "Add berries and banana", "Blend until smooth", "Pour and serve"],
  },
  "Almonds Trail Mix": {
    ingredients: ["Almonds", "Berries"],
    time: "2 mins",
    servings: 1,
    calories: 300,
    instructions: ["Mix almonds", "Add dried berries", "Store in container", "Enjoy as snack"],
  },
  "Sweet Potato Bowl": {
    ingredients: ["Sweet Potato", "Kale", "Almonds"],
    time: "25 mins",
    servings: 1,
    calories: 380,
    instructions: ["Roast sweet potato", "Saute kale", "Combine in bowl", "Top with almonds", "Drizzle olive oil"],
  },
  "Chicken Salad": {
    ingredients: ["Chicken Breast", "Spinach", "Apples"],
    time: "20 mins",
    servings: 2,
    calories: 280,
    instructions: ["Grill chicken", "Chop vegetables", "Mix in bowl", "Add dressing", "Toss and serve"],
  },
  "Egg Fried Rice": {
    ingredients: ["Egg Whites", "Brown Rice", "Bell Peppers"],
    time: "15 mins",
    servings: 2,
    calories: 320,
    instructions: [
      "Heat oil",
      "Add cooked rice",
      "Push to side, scramble eggs",
      "Mix with rice",
      "Add peppers and soy sauce",
    ],
  },
  "Paneer Tikka": {
    ingredients: ["Paneer", "Bell Peppers", "Onions"],
    time: "30 mins",
    servings: 2,
    calories: 300,
    instructions: ["Marinate paneer", "Skewer with vegetables", "Grill until charred", "Serve with chutney"],
  },
  "Lentil Salad": {
    ingredients: ["Lentils", "Carrots", "Cucumber"],
    time: "30 mins",
    servings: 2,
    calories: 220,
    instructions: ["Cook lentils", "Cool completely", "Chop vegetables", "Mix together", "Add lemon dressing"],
  },
  "Beef Broccoli": {
    ingredients: ["Lean Beef", "Broccoli"],
    time: "20 mins",
    servings: 2,
    calories: 350,
    instructions: ["Cut beef into strips", "Heat wok", "Cook beef", "Add broccoli", "Season and serve"],
  },
  "Tofu Spinach": {
    ingredients: ["Tofu", "Spinach", "Garlic"],
    time: "15 mins",
    servings: 2,
    calories: 180,
    instructions: ["Press tofu", "Heat oil", "Add garlic", "Add tofu and spinach", "Cook until done"],
  },
  "Rice Vegetable": {
    ingredients: ["Brown Rice", "Broccoli", "Carrots"],
    time: "25 mins",
    servings: 2,
    calories: 280,
    instructions: ["Cook rice", "Steam vegetables", "Mix together", "Add soy sauce", "Serve hot"],
  },
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus()
  loadData()
  setupEventListeners()
})

// Check Login Status
async function checkLoginStatus() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  
  document.getElementById("logout-btn").classList.remove("hidden");
  
  // Load user data from Supabase
  await loadUserDataFromSupabase(user.id);
  
  // Show welcome message
  if (userData.username && userData.username !== "") {
    showNotification("Welcome back, " + userData.username + "!");
  }
}

// Load user data from Supabase
async function loadUserDataFromSupabase(userId) {
  try {
    const { data, error } = await supabaseClient
      .from('user_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error loading user data:', error);
      return;
    }

    if (data) {
      userData = {
        username: data.username || "",
        email: data.email || "",
        goal: data.goal || "",
        budget: data.budget || 1000,
        cart: data.cart || [],
        weeklyPlan: data.weekly_plan || {},
        reviews: data.reviews || [],
        ingredients: data.ingredients || [],
        recipeIngredients: data.recipe_ingredients || [],
        dailyCalories: data.daily_calories || 0,
        targetCalories: data.target_calories || 2000,
      };
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
}

// Load data from localStorage (fallback)
function loadData() {
  const saved = localStorage.getItem("nutriKartData")
  if (saved) {
    userData = JSON.parse(saved)
  }
}

// Save data to Supabase
async function saveData() {
  try {
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    if (!user) {
      console.error('No user logged in');
      return;
    }

    const { error } = await supabaseClient
      .from('user_data')
      .upsert({
        user_id: user.id,
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
      });

    if (error) {
      console.error('Error saving user data:', error);
    }
  } catch (error) {
    console.error('Error saving user data:', error);
  }
  
  // Keep localStorage as backup
  localStorage.setItem("nutriKartData", JSON.stringify(userData))
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const section = e.target.dataset.section
      showSection(section)
      updateNavigation(e.target)
    })
  })

  // Dark Mode Toggle
  document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode)

  // Logout
  document.getElementById("logout-btn").addEventListener("click", handleLogout)

  // Start Button
  document.getElementById("start-btn").addEventListener("click", () => {
    showSection("goals")
    updateNavigation(document.querySelector('[data-section="goals"]'))
  })

  // Goal Selection
  document.querySelectorAll(".goal-card").forEach((card) => {
    card.addEventListener("click", selectGoal)
  })

  // Budget Range
  document.getElementById("budget-range").addEventListener("input", updateBudgetDisplay)

  // Tabs
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-button").forEach((b) => b.classList.remove("active"))
      e.target.classList.add("active")
      loadGroceries(e.target.dataset.tab)
    })
  })

  // Ingredients
  document.getElementById("add-ingredient-btn").addEventListener("click", addIngredient)
  document.getElementById("ingredient-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addIngredient()
  })

  // Recipe Ingredients
  document.getElementById("add-recipe-ingredient-btn").addEventListener("click", addRecipeIngredient)
  document.getElementById("recipe-ingredient-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addRecipeIngredient()
  })

  // Generate Recipe
  document.getElementById("generate-recipe-btn").addEventListener("click", generateRecipe)
  
  // Close Substitution Tooltip
  document.getElementById("close-tooltip").addEventListener("click", closeSubstitutionTooltip)

  // Cart Actions
  document.getElementById("print-list-btn").addEventListener("click", printList)
  document.getElementById("share-list-btn").addEventListener("click", shareList)
  document.getElementById("clear-cart-btn").addEventListener("click", clearCart)

  // Weekly Planner
  document.getElementById("generate-shopping-list-btn").addEventListener("click", generateShoppingFromPlan)
  document.getElementById("clear-plan-btn").addEventListener("click", clearWeeklyPlan)

  // Feedback
  document.getElementById("feedback-form").addEventListener("submit", submitFeedback)
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", (e) => {
      const rating = e.target.dataset.value
      document.querySelectorAll(".star").forEach((s, i) => {
        if (i < rating) s.classList.add("active")
        else s.classList.remove("active")
      })
      document.getElementById("rating-text").textContent = "Rating: " + rating + " stars"
    })
  })

  // Edit Profile
  document.getElementById("edit-profile-btn").addEventListener("click", editProfile)

  // Goal Filter
  const goalFilter = document.getElementById("goal-filter")
  if (goalFilter) {
    goalFilter.addEventListener("change", () => {
      loadSuggestedMeals()
    })
  }

  // Recipe Modal
  const closeModal = document.getElementById("close-modal")
  const closeModalBtn = document.getElementById("close-modal-btn")
  const saveToWeekly = document.getElementById("save-to-weekly")

  if (closeModal) {
    closeModal.addEventListener("click", closeRecipeModal)
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeRecipeModal)
  }
  if (saveToWeekly) {
    saveToWeekly.addEventListener("click", saveRecipeToWeekly)
  }

  // Close modal when clicking outside
  const recipeModal = document.getElementById("recipe-modal")
  if (recipeModal) {
    recipeModal.addEventListener("click", (e) => {
      if (e.target === recipeModal) {
        closeRecipeModal()
      }
    })
  }
}

// Logout Handler
async function handleLogout() {
  try {
    await supabaseClient.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
  
  // Clear local storage
  localStorage.removeItem("nutriKartData")
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("currentUser")
  
  window.location.href = "login.html"
}

// Show Section
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden")
  })
  document.getElementById(sectionId).classList.remove("hidden")

  if (sectionId === "groceries") loadGroceries("proteins")
  if (sectionId === "dashboard") updateDashboard()
  if (sectionId === "weekly-plan") loadWeeklyPlanner()
  if (sectionId === "cart") updateCart()
  if (sectionId === "meals") loadSuggestedMeals()
  if (sectionId === "recipes") loadRecipeIngredients()
  if (sectionId === "feedback") loadReviews()
}

// Update Navigation
function updateNavigation(activeBtn) {
  document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.remove("active"))
  activeBtn.classList.add("active")
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode")
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"))
}

// Select Goal
function selectGoal(e) {
  document.querySelectorAll(".goal-card").forEach((card) => card.classList.remove("selected"))
  e.currentTarget.classList.add("selected")
  userData.goal = e.currentTarget.dataset.goal
  document.getElementById("budget").classList.remove("hidden")
  saveData()
}

// Update Budget Display
function updateBudgetDisplay(e) {
  document.getElementById("budget-value").textContent = e.target.value
  userData.budget = Number.parseInt(e.target.value)
  saveData()
}

// Continue to Dashboard
function continueToDashboard() {
  if (!userData.goal) {
    showNotification("Please select a goal first")
    return
  }
  showSection("groceries")
  updateNavigation(document.querySelector('[data-section="groceries"]'))
}

// Load Groceries from Supabase
async function loadGroceries(category) {
  const grid = document.getElementById("grocery-grid")
  grid.innerHTML = ""

  if (!userData.goal) {
    grid.innerHTML = "<p>Please select a goal first</p>"
    return
  }

  try {
    const { data, error } = await supabaseClient
      .from('groceries')
      .select('*')
      .eq('goal', userData.goal)
      .eq('category', category);

    if (error) {
      console.error('Error loading groceries:', error);
      // Fallback to local data
      const items = groceries[userData.goal][category] || []
      renderGroceryItems(dedupeGroceries(items), grid)
      return
    }

    renderGroceryItems(dedupeGroceries(data || []), grid)
  } catch (error) {
    console.error('Error loading groceries:', error);
    // Fallback to local data
    const items = groceries[userData.goal][category] || []
    renderGroceryItems(dedupeGroceries(items), grid)
  }
}

function dedupeGroceries(items) {
  const seen = new Set()
  return items.filter((item) => {
    const key = `${(item.name || "").toLowerCase()}|${item.price ?? ""}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

// Render grocery items
function renderGroceryItems(items, grid) {
  items.forEach((item) => {
    const div = document.createElement("div")
    div.className = "grocery-item"
    if (userData.cart.some((c) => c.name === item.name)) {
      div.classList.add("added")
    }
    div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="grocery-image">
            <h4>${item.name}</h4>
            <p class="grocery-price">Rs${item.price}</p>
            <div class="grocery-tags">
                ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <p style="font-size: 12px; color: #666; margin-top: 8px;">${item.calories} cal</p>
        `
    div.addEventListener("click", () => addToCart(item))
    grid.appendChild(div)
  })
}

// Add to Cart
function addToCart(item) {
  const existing = userData.cart.find((c) => c.name === item.name)
  if (existing) {
    userData.cart = userData.cart.filter((c) => c.name !== item.name)
    userData.dailyCalories -= item.calories
    showNotification("Removed from cart")
  } else {
    userData.cart.push(item)
    userData.dailyCalories += item.calories
    showNotification(item.name + " added to cart")
  }
  saveData()
  loadGroceries(document.querySelector(".tab-button.active").dataset.tab)
  updateCart()
}

// Update Dashboard
function updateDashboard() {
  document.getElementById("profile-username").textContent = userData.username || "-"
  document.getElementById("profile-email").textContent = userData.email || "-"
  document.getElementById("profile-goal").textContent = userData.goal || "-"
  document.getElementById("profile-budget").textContent = userData.budget

  const totalSpent = userData.cart.reduce((sum, item) => sum + item.price, 0)
  document.getElementById("total-spent").textContent = totalSpent
  document.getElementById("total-items").textContent = userData.cart.length
  document.getElementById("meals-planned").textContent = Object.keys(userData.weeklyPlan).length

  const caloriePercent = (userData.dailyCalories / userData.targetCalories) * 100
  document.getElementById("current-calories").textContent = userData.dailyCalories
  document.getElementById("target-calories").textContent = userData.targetCalories
  document.getElementById("calorie-progress").style.width = Math.min(caloriePercent, 100) + "%"
  document.getElementById("remaining-calories").textContent = Math.max(
    0,
    userData.targetCalories - userData.dailyCalories,
  )
}

// Add Ingredient
function addIngredient() {
  const input = document.getElementById("ingredient-input")
  const ingredient = input.value.trim()

  if (!ingredient) {
    showNotification("Please enter an ingredient")
    return
  }

  if (userData.ingredients.includes(ingredient)) {
    showNotification("Already added")
    return
  }

  userData.ingredients.push(ingredient)
  saveData()
  input.value = ""
  renderIngredients()
  loadSuggestedMeals()
}

// Render Ingredients
function renderIngredients() {
  const list = document.getElementById("ingredients-list")
  list.innerHTML = userData.ingredients
    .map(
      (ing) => `
        <div class="ingredient-tag">
            ${ing}
            <button type="button" onclick="removeIngredient('${ing}')">x</button>
        </div>
    `,
    )
    .join("")
}

// Remove Ingredient
function removeIngredient(ingredient) {
  userData.ingredients = userData.ingredients.filter((i) => i !== ingredient)
  saveData()
  renderIngredients()
  loadSuggestedMeals()
}

function findMatchingMeals(userIngredients) {
  const matches = []

  Object.entries(mealDatabase).forEach(([name, meal]) => {
    const mealIngredientsLower = meal.ingredients.map((i) => i.toLowerCase())
    const userIngredientsLower = userIngredients.map((i) => i.toLowerCase())

    let matchCount = 0
    userIngredientsLower.forEach((userIng) => {
      mealIngredientsLower.forEach((mealIng) => {
        if (mealIng.includes(userIng) || userIng.includes(mealIng)) {
          matchCount++
        }
      })
    })

    if (matchCount > 0) {
      const matchPercentage = Math.round((matchCount / meal.ingredients.length) * 100)
      matches.push({
        name,
        ...meal,
        matchPercentage,
        matchCount,
      })
    }
  })

  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage)
}

// Load Suggested Meals
function loadSuggestedMeals() {
  renderIngredients()
  loadRecommendationChips()

  if (userData.ingredients.length === 0) {
    document.getElementById("suggested-meals").classList.add("hidden")
    document.getElementById("calories-summary").classList.add("hidden")
    document.getElementById("nutrition-tip").classList.add("hidden")
    return
  }

  const suggested = findMatchingMeals(userData.ingredients)
  const filteredMeals = filterMealsByGoal(suggested)

  if (filteredMeals.length === 0) {
    document.getElementById("suggested-meals").classList.add("hidden")
    document.getElementById("calories-summary").classList.add("hidden")
    document.getElementById("nutrition-tip").classList.add("hidden")
    return
  }

  document.getElementById("suggested-meals").classList.remove("hidden")
  const grid = document.getElementById("meals-grid")
  grid.innerHTML = filteredMeals
    .map(
      (meal) => `
        <div class="meal-card">
            <h4>${meal.name}</h4>
            <div class="match-progress">
                <div class="match-progress-bar">
                    <div class="match-progress-fill" style="width: ${meal.matchPercentage}%"></div>
                </div>
                <div class="match-percentage">${meal.matchPercentage}% Match</div>
            </div>
            <p>Time: ${meal.time} | Servings: ${meal.servings} | Calories: ${meal.calories}</p>
            <p style="font-size: 12px; color: #666; margin-top: 8px;">Ingredients: ${meal.ingredients.join(", ")}</p>
            <div class="meal-actions">
                <button class="meal-action-btn view-recipe-btn" onclick="viewRecipe('${meal.name}')">View Recipe</button>
                <button class="meal-action-btn save-weekly-btn" onclick="saveMealToWeekly('${meal.name}')">Save to Weekly</button>
            </div>
        </div>
    `,
    )
    .join("")

  // Update calories summary
  updateCaloriesSummary(filteredMeals)
  
  // Load nutrition tip
  loadNutritionTip(userData.ingredients)
}

// Add Recipe Ingredient
function addRecipeIngredient() {
  const input = document.getElementById("recipe-ingredient-input")
  const ingredient = input.value.trim()

  if (!ingredient) {
    showNotification("Please enter an ingredient")
    return
  }

  if (userData.recipeIngredients.includes(ingredient)) {
    showNotification("Already added")
    return
  }

  userData.recipeIngredients.push(ingredient)
  saveData()
  input.value = ""
  loadRecipeIngredients()
}

// Load Recipe Ingredients
function loadRecipeIngredients() {
  const list = document.getElementById("recipe-ingredients")
  list.innerHTML = userData.recipeIngredients
    .map(
      (ing) => `
        <div class="recipe-ingredient-tag">
            ${ing}
            <button type="button" onclick="removeRecipeIngredient('${ing}')">x</button>
        </div>
    `,
    )
    .join("")
}

// Remove Recipe Ingredient
function removeRecipeIngredient(ingredient) {
  userData.recipeIngredients = userData.recipeIngredients.filter((i) => i !== ingredient)
  saveData()
  loadRecipeIngredients()
}

// ==================== GEMINI API FUNCTIONS ====================

// Helper function to call Gemini API
async function callGeminiAPI(prompt) {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

// Generate AI-powered recipe using Gemini
async function generateAIRecipe(ingredients) {
  const prompt = `Generate a healthy, creative recipe using these ingredients: ${ingredients.join(", ")}.

IMPORTANT: Respond with ONLY a valid JSON object, no additional text or markdown.

The JSON must have this exact structure:
{
  "title": "Recipe name",
  "ingredients": ["ingredient 1 with amount", "ingredient 2 with amount", "..."],
  "steps": ["step 1", "step 2", "...", "step 5-7"],
  "prepTime": "X mins",
  "servings": X
}

Make it nutritious and delicious. Include 5-7 clear cooking steps.`;

  const response = await callGeminiAPI(prompt);
  
  // Clean up the response to extract JSON
  let jsonText = response.trim();
  
  // Remove markdown code blocks if present
  jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  
  // Try to find JSON object
  const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    jsonText = jsonMatch[0];
  }
  
  return JSON.parse(jsonText);
}

// Generate Chef's Note using Gemini
async function generateChefNote(ingredients) {
  const prompt = `Write a 1-sentence chef note for a recipe made with ${ingredients.join(", ")}. 
Tone: friendly, short, and health-aware. Focus on flavor balance or nutritional benefits. 
Maximum 20 words. Do NOT include any emojis.`;

  const response = await callGeminiAPI(prompt);
  return response.trim();
}

// Generate Health Tip using Gemini
async function generateHealthTip(ingredients) {
  const prompt = `Give a short health tip about the benefits of eating ${ingredients.join(", ")}. 
Keep it under 20 words. Be specific and informative. Do NOT include emojis.`;

  const response = await callGeminiAPI(prompt);
  return response.trim();
}

// Generate Ingredient Substitution using Gemini
async function generateSubstitution(ingredient) {
  const prompt = `Suggest 2 healthy alternative substitutes for "${ingredient}" in cooking. 
Format: Just list the alternatives separated by "or", like "quinoa or barley".
Keep it very short, maximum 10 words.`;

  const response = await callGeminiAPI(prompt);
  return response.trim();
}

// ==================== RECIPE GENERATION ====================

async function generateRecipe() {
  if (userData.recipeIngredients.length === 0) {
    showNotification("Add at least one ingredient")
    return
  }

  // Show loading state
  const generatedRecipeDiv = document.getElementById("generated-recipe");
  const loadingDiv = document.getElementById("recipe-loading");
  const contentDiv = document.getElementById("recipe-content");
  
  generatedRecipeDiv.classList.remove("hidden");
  loadingDiv.classList.remove("hidden");
  contentDiv.classList.add("hidden");
  
  // Hide insight boxes
  document.getElementById("chef-note").classList.add("hidden");
  document.getElementById("health-tip").classList.add("hidden");

  try {
    // Generate AI recipe
    const aiRecipe = await generateAIRecipe(userData.recipeIngredients);
    
    // Convert AI recipe to our format
    const recipe = {
      name: aiRecipe.title,
      ingredients: aiRecipe.ingredients,
      instructions: aiRecipe.steps,
      time: aiRecipe.prepTime,
      servings: aiRecipe.servings
    };
    
    // Display the recipe
    displayRecipe(recipe);
    
    // Generate and display Chef's Note
    generateChefNote(userData.recipeIngredients).then(note => {
      document.getElementById("chef-note-text").textContent = note;
      document.getElementById("chef-note").classList.remove("hidden");
    }).catch(err => {
      console.error("Chef note error:", err);
    });
    
    // Generate and display Health Tip
    generateHealthTip(userData.recipeIngredients).then(tip => {
      document.getElementById("health-tip-text").textContent = tip;
      document.getElementById("health-tip").classList.remove("hidden");
    }).catch(err => {
      console.error("Health tip error:", err);
    });
    
    showNotification("AI-powered recipe generated successfully! 🎉");
    
  } catch (error) {
    console.error("Recipe generation error:", error);
    showNotification("Failed to generate recipe. Using fallback...");
    
    // Fallback to template-based recipe
    const fallbackRecipe = {
      name: `Quick ${userData.recipeIngredients[0]} Stir Fry`,
      ingredients: userData.recipeIngredients,
      instructions: [
        `Prepare all ${userData.recipeIngredients.length} ingredients by washing and chopping`,
        "Heat 2 tablespoons oil in a wok or large pan",
        `Add ${userData.recipeIngredients[0]} first and cook for 3-4 minutes`,
        `Add remaining ingredients: ${userData.recipeIngredients.slice(1).join(", ")}`,
        "Stir fry for 8-10 minutes until cooked",
        "Season with salt, pepper, and soy sauce",
        "Serve hot with rice or bread"
      ],
      time: "20 mins",
      servings: 2
    };
    displayRecipe(fallbackRecipe);
  } finally {
    // Hide loading, show content
    loadingDiv.classList.add("hidden");
    contentDiv.classList.remove("hidden");
  }
}

// Display Recipe
function displayRecipe(recipe) {
  document.getElementById("recipe-name").textContent = recipe.name
  
  // Make ingredients clickable for substitutions
  const ingredientsList = document.getElementById("recipe-ingredients-list");
  ingredientsList.innerHTML = recipe.ingredients
    .map((ing, index) => `<li class="clickable-ingredient" data-ingredient="${ing}" data-index="${index}">${ing}</li>`)
    .join("")
  
  // Add click event listeners to ingredients
  ingredientsList.querySelectorAll('.clickable-ingredient').forEach(li => {
    li.addEventListener('click', () => showIngredientSubstitution(li.dataset.ingredient));
  });
  
  document.getElementById("recipe-instructions").innerHTML = recipe.instructions
    .map((inst) => `<li>${inst}</li>`)
    .join("")
  document.getElementById("recipe-time").textContent = recipe.time
  document.getElementById("recipe-servings").textContent = recipe.servings
  document.getElementById("generated-recipe").classList.remove("hidden")
}

// Show Ingredient Substitution Tooltip
async function showIngredientSubstitution(ingredient) {
  const tooltip = document.getElementById("substitution-tooltip");
  const tooltipIngredient = document.getElementById("tooltip-ingredient");
  const tooltipContent = document.getElementById("tooltip-content");
  
  // Show tooltip with loading state
  tooltipIngredient.textContent = ingredient;
  tooltipContent.innerHTML = '<div class="loading-spinner-small"></div><p>Loading alternatives...</p>';
  tooltip.classList.remove("hidden");
  
  try {
    const substitution = await generateSubstitution(ingredient);
    tooltipContent.innerHTML = `<p><strong>Healthy Alternatives:</strong></p><p>You can replace <strong>${ingredient}</strong> with <em>${substitution}</em>.</p>`;
  } catch (error) {
    console.error("Substitution error:", error);
    tooltipContent.innerHTML = '<p>Sorry, unable to load substitutions at this time. Please try again later.</p>';
  }
}

// Close Substitution Tooltip
function closeSubstitutionTooltip() {
  document.getElementById("substitution-tooltip").classList.add("hidden");
}

// Load Weekly Planner
function loadWeeklyPlanner() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const grid = document.getElementById("weekly-grid")
  grid.innerHTML = ""

  days.forEach((day) => {
    const card = document.createElement("div")
    card.className = "day-card"
    const meal = userData.weeklyPlan[day] || "Not planned"
    card.innerHTML = `
            <h4>${day}</h4>
            <div class="meal-slot" onclick="planMeal('${day}')">
                <p>${meal}</p>
            </div>
        `
    grid.appendChild(card)
  })
}

// Plan Meal
function planMeal(day) {
  const meal = prompt("Enter meal for " + day + ":")
  if (meal) {
    userData.weeklyPlan[day] = meal
    saveData()
    loadWeeklyPlanner()
    showNotification("Meal planned for " + day)
  }
}

// Add Meal to Weekly
function addMealToWeekly(mealName) {
  const day = prompt("Which day? (Monday-Sunday)")
  if (day && ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].includes(day)) {
    userData.weeklyPlan[day] = mealName
    saveData()
    showNotification(mealName + " added to " + day)
  }
}

// Save Meal to Weekly Plan (new function)
function saveMealToWeekly(mealName) {
  const day = prompt("Which day? (Monday-Sunday)")
  if (day && ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].includes(day)) {
    userData.weeklyPlan[day] = mealName
    saveData()
    showNotification("✅ " + mealName + " saved to " + day + " in your weekly plan!")
  }
}

// Filter meals by goal
function filterMealsByGoal(meals) {
  const goalFilter = document.getElementById("goal-filter")
  const selectedGoal = goalFilter ? goalFilter.value : "all"
  
  if (selectedGoal === "all") return meals
  
  // Filter meals based on goal (this is a simple implementation)
  // In a real app, you'd have goal-specific meal data
  return meals.filter(meal => {
    const mealName = meal.name.toLowerCase()
    switch (selectedGoal) {
      case "weight-loss":
        return mealName.includes("salad") || mealName.includes("soup") || mealName.includes("grilled") || meal.calories < 300
      case "muscle-gain":
        return mealName.includes("protein") || mealName.includes("beef") || mealName.includes("chicken") || meal.calories > 400
      case "healthy-living":
        return mealName.includes("quinoa") || mealName.includes("vegetable") || mealName.includes("bowl") || meal.calories >= 200
      default:
        return true
    }
  })
}

// Load recommendation chips
function loadRecommendationChips() {
  const chipsContainer = document.getElementById("recommendation-chips")
  if (!chipsContainer) return

  const recommendations = [
    "Spinach", "Rice", "Chicken", "Tomatoes", "Onions", "Garlic", 
    "Bell Peppers", "Broccoli", "Carrots", "Eggs", "Cheese", "Olive Oil"
  ]

  // Filter out ingredients already added
  const availableRecommendations = recommendations.filter(rec => 
    !userData.ingredients.some(ing => ing.toLowerCase() === rec.toLowerCase())
  )

  chipsContainer.innerHTML = availableRecommendations
    .slice(0, 6) // Show max 6 recommendations
    .map(ingredient => 
      `<span class="recommendation-chip" onclick="addRecommendedIngredient('${ingredient}')">+ ${ingredient}</span>`
    ).join("")
}

// Add recommended ingredient
function addRecommendedIngredient(ingredient) {
  if (userData.ingredients.includes(ingredient)) {
    showNotification("Already added")
    return
  }

  userData.ingredients.push(ingredient)
  saveData()
  loadSuggestedMeals()
  showNotification(ingredient + " added!")
}

// Update calories summary
function updateCaloriesSummary(meals) {
  const summaryElement = document.getElementById("calories-summary")
  if (!summaryElement || meals.length === 0) return

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const avgCookTime = Math.round(meals.reduce((sum, meal) => {
    const time = parseInt(meal.time) || 0
    return sum + time
  }, 0) / meals.length)
  const bestMatch = meals[0]?.name || "-"

  document.getElementById("total-calories").textContent = totalCalories
  document.getElementById("avg-cook-time").textContent = avgCookTime + " mins"
  document.getElementById("best-match").textContent = bestMatch

  summaryElement.classList.remove("hidden")
}

// Load nutrition tip
async function loadNutritionTip(ingredients) {
  const tipElement = document.getElementById("nutrition-tip")
  const tipContent = document.getElementById("tip-content")
  
  if (!tipElement || !tipContent) return

  tipElement.classList.remove("hidden")

  try {
    // Try Gemini API first
    const tip = await generateNutritionTipWithGemini(ingredients)
    tipContent.textContent = tip
  } catch (error) {
    console.warn("Gemini API failed, using fallback:", error)
    // Fallback to rule-based tips
    tipContent.textContent = generateFallbackNutritionTip(ingredients)
  }
}

// Generate nutrition tip with Gemini API
async function generateNutritionTipWithGemini(ingredients) {
  const GEMINI_API_KEY = "AIzaSyBvIJc52hb3Fp6UVfTlf1MTxZ-zyNHmD6I"
  
  if (!GEMINI_API_KEY || ingredients.length === 0) {
    throw new Error("No API key or ingredients")
  }

  const prompt = `Based on these ingredients: ${ingredients.join(", ")}, provide a short, helpful nutrition tip (max 100 words) about combining them for optimal health benefits.`
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  })

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`)
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Great ingredient combination!"
}

// Generate fallback nutrition tip
function generateFallbackNutritionTip(ingredients) {
  const tips = [
    "💡 Try adding leafy greens like spinach or kale to boost your meal's vitamin content!",
    "💡 Pair your proteins with colorful vegetables for a well-balanced, nutritious meal.",
    "💡 Don't forget to include healthy fats like olive oil or avocado for better nutrient absorption.",
    "💡 Adding herbs and spices not only enhances flavor but also provides antioxidants.",
    "💡 Consider the rainbow - the more colorful your ingredients, the more diverse nutrients you get!",
    "💡 Whole grains like quinoa or brown rice add fiber and keep you satisfied longer.",
    "💡 Fresh ingredients are always best - they retain more vitamins and minerals than processed ones."
  ]

  // Simple logic based on ingredients
  if (ingredients.some(ing => ing.toLowerCase().includes("chicken"))) {
    return "💡 Chicken is a great lean protein! Pair it with vegetables and whole grains for a complete meal."
  }
  if (ingredients.some(ing => ing.toLowerCase().includes("spinach"))) {
    return "💡 Spinach is packed with iron and folate! Add some citrus or tomatoes to boost iron absorption."
  }
  if (ingredients.some(ing => ing.toLowerCase().includes("rice"))) {
    return "💡 Rice provides energy! Choose brown rice for extra fiber and nutrients."
  }

  return tips[Math.floor(Math.random() * tips.length)]
}

// View recipe modal
function viewRecipe(mealName) {
  const meal = mealDatabase[mealName]
  if (!meal) return

  const modal = document.getElementById("recipe-modal")
  const modalName = document.getElementById("modal-recipe-name")
  const modalPrepTime = document.getElementById("modal-prep-time")
  const modalServings = document.getElementById("modal-servings")
  const modalCalories = document.getElementById("modal-calories")
  const modalIngredients = document.getElementById("modal-ingredients")
  const modalInstructions = document.getElementById("modal-instructions")

  modalName.textContent = mealName
  modalPrepTime.textContent = meal.time
  modalServings.textContent = meal.servings
  modalCalories.textContent = meal.calories
  modalIngredients.innerHTML = meal.ingredients.map(ing => `<li>${ing}</li>`).join("")
  modalInstructions.innerHTML = meal.instructions.map(inst => `<li>${inst}</li>`).join("")

  modal.classList.remove("hidden")
}

// Close recipe modal
function closeRecipeModal() {
  const modal = document.getElementById("recipe-modal")
  modal.classList.add("hidden")
}

// Save recipe to weekly plan from modal
function saveRecipeToWeekly() {
  const modalName = document.getElementById("modal-recipe-name")
  const mealName = modalName.textContent
  
  const day = prompt("Which day? (Monday-Sunday)")
  if (day && ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].includes(day)) {
    userData.weeklyPlan[day] = mealName
    saveData()
    showNotification("✅ " + mealName + " saved to " + day + " in your weekly plan!")
    closeRecipeModal()
  }
}

// Generate Shopping from Plan
function generateShoppingFromPlan() {
  showNotification("Shopping list generated from weekly plan")
}

// Clear Weekly Plan
function clearWeeklyPlan() {
  if (confirm("Clear all weekly plans?")) {
    userData.weeklyPlan = {}
    saveData()
    loadWeeklyPlanner()
    showNotification("Weekly plan cleared")
  }
}

// Update Cart
function updateCart() {
  const itemsList = document.getElementById("cart-items-list")
  const total = userData.cart.reduce((sum, item) => sum + item.price, 0)
  const budgetLeft = userData.budget - total

  document.getElementById("cart-items").textContent = userData.cart.length
  document.getElementById("cart-total").textContent = total
  document.getElementById("budget-status").textContent = budgetLeft >= 0 ? "Within Budget" : "Over Budget"

  itemsList.innerHTML = userData.cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.calories} cal | ${item.protein}g protein</p>
            </div>
            <div class="item-price">Rs${item.price}</div>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
        </div>
    `,
    )
    .join("")
}

// Remove from Cart
function removeFromCart(itemName) {
  const item = userData.cart.find((i) => i.name === itemName)
  if (item) {
    userData.dailyCalories -= item.calories
  }
  userData.cart = userData.cart.filter((item) => item.name !== itemName)
  saveData()
  updateCart()
  showNotification("Removed from cart")
}

// Clear Cart
function clearCart() {
  if (confirm("Clear entire cart?")) {
    userData.dailyCalories = 0
    userData.cart = []
    saveData()
    updateCart()
    showNotification("Cart cleared")
  }
}

// Print List
function printList() {
  window.print()
}

// Share List
function shareList() {
  const list = userData.cart.map((item) => item.name + " - Rs" + item.price).join("\n")
  if (navigator.share) {
    navigator.share({
      title: "NutriKart Shopping List",
      text: list,
    })
  } else {
    alert("Shopping List:\n" + list)
  }
}

// Submit Feedback
function submitFeedback(e) {
  e.preventDefault()
  const rating = document.querySelectorAll(".star.active").length
  const text = document.getElementById("feedback-text").value

  if (rating === 0) {
    showNotification("Please rate first")
    return
  }

  userData.reviews.push({
    username: userData.username,
    rating: rating,
    text: text,
    date: new Date().toLocaleDateString(),
  })

  saveData()
  document.getElementById("feedback-form").reset()
  document.querySelectorAll(".⭐").forEach((s) => s.classList.remove("active"))
  document.getElementById("rating-text").textContent = "Click to rate"
  loadReviews()
  showNotification("Thank you for your feedback!")
}

// Load Reviews
function loadReviews() {
  const container = document.getElementById("reviews-container")
  container.innerHTML = userData.reviews
    .map(
      (review) => `
        <div class="review-item">
            <div class="review-header">
                <strong>${review.username}</strong>
                <span class="review-rating">${"⭐ ".repeat(review.rating)}</span>
            </div>
            <p class="review-text">${review.text}</p>
            <small>${review.date}</small>
        </div>
    `,
    )
    .join("")
}

// Edit Profile
function editProfile() {
  const newUsername = prompt("New username:", userData.username)
  if (newUsername) {
    userData.username = newUsername
    saveData()
    updateDashboard()
    showNotification("Profile updated")
  }
}

// Show Notification
function showNotification(message) {
  const notif = document.getElementById("notification")
  notif.textContent = message
  notif.classList.remove("hidden")
  setTimeout(() => {
    notif.classList.add("hidden")
  }, 3000)
}

// Simple Assistant functionality
function openAssistant() {
  const modal = document.getElementById('assistant-modal');
  modal.classList.remove('hidden');
}

function closeAssistant() {
  const modal = document.getElementById('assistant-modal');
  modal.classList.add('hidden');
}

// Close assistant when clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('assistant-modal');
  const modalContent = document.querySelector('.assistant-modal-content');
  
  if (e.target === modal) {
    closeAssistant();
  }
});

// Close assistant with escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeAssistant();
  }
});

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode")
}

// Expose functions globally for onclick handlers
window.viewRecipe = viewRecipe
window.closeRecipeModal = closeRecipeModal
window.saveRecipeToWeekly = saveRecipeToWeekly
window.saveMealToWeekly = saveMealToWeekly
window.addRecommendedIngredient = addRecommendedIngredient

// ==================== LEADERBOARD SECTION ====================

// Demo Leaderboard Data (10 users)
const leaderboardUsers = [
  {
    id: 1,
    name: "Diya Nair",
    role: "Nutritionist",
    score: 98,
    streak: 45,
    level: "platinum",
    avatar: "https://i.pravatar.cc/150?img=1",
    aiEnabled: true,
    bio: "Certified nutritionist with 10+ years of experience in holistic health and wellness. Passionate about plant-based nutrition and sustainable eating habits.",
    specialties: ["Plant-Based Diet", "Weight Management", "Sports Nutrition", "Meal Planning"]
  },
  {
    id: 2,
    name: "Aarav Mehta",
    role: "Fitness Coach",
    score: 95,
    streak: 38,
    level: "gold",
    avatar: "https://i.pravatar.cc/150?img=12",
    aiEnabled: true,
    bio: "Elite fitness trainer specializing in strength training and nutrition optimization for athletes. Helping clients achieve peak performance through balanced diets.",
    specialties: ["High Protein Diet", "Muscle Building", "Pre-Workout Nutrition", "Recovery Foods"]
  },
  {
    id: 3,
    name: "Rohan Singh",
    role: "Wellness Mentor",
    score: 92,
    streak: 42,
    level: "gold",
    avatar: "https://i.pravatar.cc/150?img=13",
    aiEnabled: true,
    bio: "Holistic wellness coach focusing on mindful eating and mental health. Advocate for balanced lifestyle and stress-free nutrition habits.",
    specialties: ["Mindful Eating", "Stress Management", "Ayurvedic Diet", "Digestive Health"]
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Diet Planner",
    score: 89,
    streak: 35,
    level: "silver",
    avatar: "https://i.pravatar.cc/150?img=5",
    aiEnabled: false,
    bio: "Expert in customized diet planning for various health conditions. Specializing in therapeutic diets and chronic disease management.",
    specialties: ["Diabetes Diet", "Heart-Healthy Foods", "PCOS Management", "Thyroid Care"]
  },
  {
    id: 5,
    name: "Arjun Patel",
    role: "Health Enthusiast",
    score: 86,
    streak: 29,
    level: "silver",
    avatar: "https://i.pravatar.cc/150?img=14",
    aiEnabled: false,
    bio: "Fitness enthusiast and nutrition advocate. Love sharing tips on clean eating and budget-friendly healthy meal prep.",
    specialties: ["Budget Meals", "Clean Eating", "Intermittent Fasting", "Macro Tracking"]
  },
  {
    id: 6,
    name: "Ananya Reddy",
    role: "Yoga & Nutrition",
    score: 84,
    streak: 31,
    level: "silver",
    avatar: "https://i.pravatar.cc/150?img=9",
    aiEnabled: false,
    bio: "Certified yoga instructor combining ancient wisdom with modern nutrition science for optimal health and wellbeing.",
    specialties: ["Vegan Meals", "Detox Plans", "Anti-Inflammatory Diet", "Gut Health"]
  },
  {
    id: 7,
    name: "Vikram Desai",
    role: "Sports Nutritionist",
    score: 81,
    streak: 26,
    level: "bronze",
    avatar: "https://i.pravatar.cc/150?img=15",
    aiEnabled: false,
    bio: "Sports nutrition expert working with amateur and professional athletes. Focused on performance enhancement through proper fueling.",
    specialties: ["Energy Boosting", "Endurance Foods", "Hydration Strategy", "Competition Prep"]
  },
  {
    id: 8,
    name: "Ishita Kapoor",
    role: "Food Blogger",
    score: 78,
    streak: 23,
    level: "bronze",
    avatar: "https://i.pravatar.cc/150?img=10",
    aiEnabled: false,
    bio: "Passionate food blogger sharing healthy recipes and nutrition hacks. Making healthy eating fun and accessible for everyone.",
    specialties: ["Quick Recipes", "Healthy Snacks", "Meal Prep", "Indian Cuisine"]
  },
  {
    id: 9,
    name: "Karan Malhotra",
    role: "Nutrition Student",
    score: 75,
    streak: 20,
    level: "bronze",
    avatar: "https://i.pravatar.cc/150?img=17",
    aiEnabled: false,
    bio: "Final year nutrition student eager to learn and share knowledge. Interested in evidence-based nutrition and emerging food trends.",
    specialties: ["Student Meals", "Budget Friendly", "Quick & Easy", "Research Insights"]
  },
  {
    id: 10,
    name: "Sneha Iyer",
    role: "Home Chef",
    score: 72,
    streak: 18,
    level: "bronze",
    avatar: "https://i.pravatar.cc/150?img=20",
    aiEnabled: false,
    bio: "Home chef passionate about traditional South Indian cuisine with a healthy twist. Love experimenting with wholesome ingredients.",
    specialties: ["South Indian", "Traditional Recipes", "Home Cooking", "Family Meals"]
  }
];

let currentSort = 'score';
let selectedUser = null;
let chatHistory = [];

// Load Leaderboard
function loadLeaderboard() {
  const grid = document.getElementById('leaderboard-grid');
  const sortedUsers = sortLeaderboard(currentSort);
  
  grid.innerHTML = sortedUsers.map((user, index) => {
    const rank = index + 1;
    const topClass = rank <= 3 ? `top-${rank}` : '';
    
    return `
      <div class="leaderboard-card ${topClass}" onclick="openProfileModal(${user.id})">
        <div class="rank-badge">#${rank}</div>
        
        <div class="profile-section">
          <img src="${user.avatar}" alt="${user.name}" class="profile-avatar">
          <div class="profile-data">
            <h3>${user.name}</h3>
            <div class="profile-meta">
              <span class="profile-role">${user.role}</span>
              <span class="level-badge ${user.level}">${user.level}</span>
              ${user.aiEnabled ? '<span class="ai-badge">AI</span>' : ''}
            </div>
          </div>
        </div>
        
        <div class="stats-row">
          <div class="stat-box">
            <span class="stat-label">Score</span>
            <span class="stat-value">${user.score}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Streak</span>
            <span class="stat-value">${user.streak} days</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Sort Leaderboard
function sortLeaderboard(sortBy) {
  const users = [...leaderboardUsers];
  if (sortBy === 'score') {
    return users.sort((a, b) => b.score - a.score);
  } else if (sortBy === 'streak') {
    return users.sort((a, b) => b.streak - a.streak);
  }
  return users;
}

// Handle Sort Button Click
function handleSortChange(sortType) {
  currentSort = sortType;
  
  // Update active button
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.closest('.sort-btn').classList.add('active');
  
  loadLeaderboard();
}

// Open Profile Modal
function openProfileModal(userId) {
  selectedUser = leaderboardUsers.find(u => u.id === userId);
  if (!selectedUser) return;
  
  const modal = document.getElementById('profile-modal');
  const rank = leaderboardUsers.sort((a, b) => b.score - a.score).findIndex(u => u.id === userId) + 1;
  
  document.getElementById('modal-avatar').src = selectedUser.avatar;
  document.getElementById('modal-name').textContent = selectedUser.name;
  document.getElementById('modal-badge').textContent = selectedUser.level;
  document.getElementById('modal-badge').className = `level-badge ${selectedUser.level}`;
  document.getElementById('modal-rank').textContent = `#${rank}`;
  document.getElementById('modal-score').textContent = `${selectedUser.score}/100`;
  document.getElementById('modal-progress').style.width = `${selectedUser.score}%`;
  document.getElementById('modal-streak').textContent = `${selectedUser.streak} days`;
  document.getElementById('modal-bio').textContent = selectedUser.bio;
  
  const specialtiesHtml = selectedUser.specialties.map(s => 
    `<span class="specialty-tag">${s}</span>`
  ).join('');
  document.getElementById('modal-specialties').innerHTML = specialtiesHtml;
  
  modal.classList.remove('hidden');
}

// Close Profile Modal
function closeProfileModal() {
  document.getElementById('profile-modal').classList.add('hidden');
}

// Ask for Guidance Button Click
function handleAskGuidance() {
  if (!selectedUser) return;
  
  closeProfileModal();
  
  if (selectedUser.aiEnabled) {
    // Open AI Chat for top 3 users
    openChatModal();
  } else {
    // Show subscription modal for others
    openSubscriptionModal();
  }
}

// Open Chat Modal (AI-enabled users)
function openChatModal() {
  const chatModal = document.getElementById('chat-modal');
  
  document.getElementById('chat-avatar').src = selectedUser.avatar;
  document.getElementById('chat-name').textContent = selectedUser.name;
  document.getElementById('chat-role').textContent = selectedUser.role;
  
  // Reset chat history
  chatHistory = [];
  const messagesDiv = document.getElementById('chat-messages');
  messagesDiv.innerHTML = `
    <div class="chat-message bot-message">
      <div class="message-bubble">
        Hello! I'm ${selectedUser.name}, your ${selectedUser.role}. I'm here to help you with your nutrition goals. Feel free to ask me anything! 🌟
      </div>
    </div>
  `;
  
  chatModal.classList.remove('hidden');
  document.getElementById('chat-input').value = '';
  document.getElementById('chat-input').focus();
}

// Close Chat Modal
function closeChatModal() {
  document.getElementById('chat-modal').classList.add('hidden');
}

// Send Chat Message
async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message to chat
  const messagesDiv = document.getElementById('chat-messages');
  messagesDiv.innerHTML += `
    <div class="chat-message user-message">
      <div class="message-bubble">${message}</div>
    </div>
  `;
  
  input.value = '';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
  // Show loading indicator
  document.getElementById('chat-loading').classList.remove('hidden');
  
  try {
    // Create context-aware prompt
    const context = `You are ${selectedUser.name}, a ${selectedUser.role} with expertise in: ${selectedUser.specialties.join(', ')}. 
${selectedUser.bio}

User question: ${message}

Provide helpful, friendly, and professional advice related to nutrition, diet, or wellness. Keep your response concise (2-3 sentences max). Be encouraging and supportive.`;
    
    const response = await callGeminiAPI(context);
    
    // Add bot response
    messagesDiv.innerHTML += `
      <div class="chat-message bot-message">
        <div class="message-bubble">${response}</div>
      </div>
    `;
    
  } catch (error) {
    console.error('Chat error:', error);
    messagesDiv.innerHTML += `
      <div class="chat-message bot-message">
        <div class="message-bubble">Sorry, I'm having trouble responding right now. Please try again in a moment! 😊</div>
      </div>
    `;
  } finally {
    document.getElementById('chat-loading').classList.add('hidden');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

// Handle Enter Key in Chat
function handleChatKeypress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

// Open Subscription Modal
function openSubscriptionModal() {
  document.getElementById('subscription-modal').classList.remove('hidden');
}

// Close Subscription Modal
function closeSubscriptionModal() {
  document.getElementById('subscription-modal').classList.add('hidden');
}

// Handle Subscribe Now
function handleSubscribeNow() {
  closeSubscriptionModal();
  showNotification('🎉 Subscription Activated! You now have access to all expert chats.');
  
  // Optionally enable AI for the current user (demo only)
  if (selectedUser) {
    selectedUser.aiEnabled = true;
  }
}

// Handle Maybe Later
function handleMaybeLater() {
  closeSubscriptionModal();
  showNotification('You can subscribe anytime from the profile menu!');
}

// Setup Leaderboard Event Listeners
function setupLeaderboardListeners() {
  // Sort buttons
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sortType = btn.dataset.sort;
      handleSortChange(sortType);
    });
  });
  
  // Profile modal close
  document.getElementById('close-profile-modal').addEventListener('click', closeProfileModal);
  
  // Ask guidance button
  document.getElementById('ask-guidance-btn').addEventListener('click', handleAskGuidance);
  
  // Chat modal close
  document.getElementById('close-chat-modal').addEventListener('click', closeChatModal);
  
  // Send chat button
  document.getElementById('send-chat-btn').addEventListener('click', sendChatMessage);
  
  // Chat input enter key
  document.getElementById('chat-input').addEventListener('keypress', handleChatKeypress);
  
  // Subscription modal close
  document.getElementById('close-subscription-modal').addEventListener('click', closeSubscriptionModal);
  
  // Subscribe buttons
  document.getElementById('subscribe-now-btn').addEventListener('click', handleSubscribeNow);
  document.getElementById('maybe-later-btn').addEventListener('click', handleMaybeLater);
  
  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
      }
    });
  });
}

// Initialize leaderboard when section is shown
const originalShowSection = showSection;
showSection = function(sectionId) {
  originalShowSection(sectionId);
  if (sectionId === 'leaderboard') {
    loadLeaderboard();
  }
};

// Call setup on page load
window.addEventListener('DOMContentLoaded', () => {
  setupLeaderboardListeners();
});

// Expose functions globally
window.openProfileModal = openProfileModal
window.handleSortChange = handleSortChange
