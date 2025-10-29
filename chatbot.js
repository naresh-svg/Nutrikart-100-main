// NutriKart AI Chatbot
class NutriKartChatbot {
    constructor() {
        this.currentMode = null;
        this.userProfile = null;
        this.chatHistory = [];
        this.isTyping = false;
        
        // Supabase Configuration
        this.SUPABASE_URL = 'https://knbwwhsrsszrhrcsgvxg.supabase.co';
        this.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuYnd3aHNyc3N6cmhyY3NndnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDIxMTUsImV4cCI6MjA3Njk3ODExNX0.W0gogF-_MIzPPWv3MoN-xPUgDaQQJzGDrXhPJsl6Qpw';
        
        // Initialize Supabase
        this.supabase = supabase.createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY);
        
        // Google AI API Key
        this.GOOGLE_AI_KEY = 'AIzaSyCMlN9eSb-PwFzqgT9-R0eWIq7WjJ3-Na4';
        
        this.init();
    }

    async init() {
        await this.loadUserProfile();
        this.setupEventListeners();
        this.updateCurrentTime();
        setInterval(() => this.updateCurrentTime(), 60000); // Update every minute
    }

    async loadUserProfile() {
        try {
            const { data: { user } } = await this.supabase.auth.getUser();
            if (user) {
                const { data: userData } = await this.supabase
                    .from('user_data')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();
                
                if (userData) {
                    this.userProfile = userData;
                    this.updateProfileDisplay();
                }
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    updateProfileDisplay() {
        if (!this.userProfile) return;
        
        document.getElementById('profile-goal').textContent = this.userProfile.goal || 'Not set';
        document.getElementById('profile-budget').textContent = `Rs ${this.userProfile.budget || 0}`;
        document.getElementById('profile-calories').textContent = `${this.userProfile.daily_calories || 0} cal`;
        document.getElementById('profile-cart').textContent = this.userProfile.cart?.length || 0;
    }

    setupEventListeners() {
        // Mode selection
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.selectMode(mode);
            });
        });

        // Send message
        document.getElementById('send-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick actions
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Profile toggle
        document.getElementById('toggle-profile').addEventListener('click', () => {
            this.toggleProfile();
        });

        // Control buttons
        document.getElementById('minimize-btn').addEventListener('click', () => {
            this.minimizeChat();
        });

        document.getElementById('close-btn').addEventListener('click', () => {
            this.closeChat();
        });
    }

    selectMode(mode) {
        this.currentMode = mode;
        
        // Update UI
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // Hide mode selection, show chat
        document.getElementById('mode-selection').style.display = 'none';
        document.getElementById('chat-interface').style.display = 'flex';
        
        // Send mode-specific welcome message
        this.sendBotMessage(this.getModeWelcomeMessage(mode));
    }

    getModeWelcomeMessage(mode) {
        const messages = {
            reflect: `🤔 Welcome to Reflect Mode! I'm here to help you understand how your meals affect your mood and energy. Tell me about your day - what did you eat and how are you feeling? I'll help you identify patterns and suggest improvements based on your profile.`,
            coach: `💪 Welcome to Coach Mode! I'm your personal nutrition coach. I can help you plan tomorrow's meals based on your goals (${this.userProfile?.goal || 'not set'}), budget (Rs ${this.userProfile?.budget || 0}), and current progress. What would you like to focus on?`,
            guide: `👥 Welcome to Guide Mode! I'm here to help with team challenges and community features. I can create nutrition challenges, track group progress, and help coordinate healthy activities. What kind of team support do you need?`
        };
        return messages[mode] || "Hello! How can I help you today?";
    }

    async sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Generate AI response
            const response = await this.generateAIResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", 'bot');
            console.error('Error generating response:', error);
        }
    }

    async generateAIResponse(userMessage) {
        const context = this.buildContext();
        const prompt = this.buildPrompt(userMessage, context);
        
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.GOOGLE_AI_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });
            
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error calling Google AI:', error);
            return this.getFallbackResponse(userMessage);
        }
    }

    buildContext() {
        const context = {
            mode: this.currentMode,
            userProfile: this.userProfile,
            currentTime: new Date().toLocaleTimeString(),
            chatHistory: this.chatHistory.slice(-5) // Last 5 messages
        };
        return context;
    }

    buildPrompt(userMessage, context) {
        const modeInstructions = {
            reflect: `You are a nutrition reflection assistant. Help users analyze how their meals affect their mood and energy. Extract emotion keywords and suggest mood-food correlations. Be empathetic and supportive.`,
            coach: `You are a personal nutrition coach. Help users plan meals based on their goals, budget, and preferences. Provide practical, actionable advice. Be motivational and specific.`,
            guide: `You are a community nutrition guide. Help with team challenges, group activities, and community features. Be encouraging and collaborative.`
        };

        const profileInfo = context.userProfile ? `
User Profile:
- Goal: ${context.userProfile.goal || 'Not set'}
- Budget: Rs ${context.userProfile.budget || 0} per week
- Daily Calories: ${context.userProfile.daily_calories || 0}
- Cart Items: ${context.userProfile.cart?.length || 0}
- Target Calories: ${context.userProfile.target_calories || 2000}
        ` : 'No user profile available';

        return `${modeInstructions[context.mode]}

${profileInfo}

Current time: ${context.currentTime}

Recent conversation:
${context.chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User message: ${userMessage}

Respond as NutriKart AI assistant. Keep responses helpful, friendly, and under 200 words. Use emojis appropriately.`;
    }

    getFallbackResponse(userMessage) {
        const fallbacks = {
            reflect: "I'd love to help you reflect on your meals and mood. Can you tell me more about what you ate today and how you're feeling?",
            coach: "I'm here to help you plan your meals! What specific meal planning challenge are you facing?",
            guide: "I can help with team challenges and community features. What kind of group activity are you interested in?"
        };
        return fallbacks[this.currentMode] || "I'm here to help! Can you tell me more about what you need?";
    }

    addMessage(content, role) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        const avatar = role === 'bot' ? '🥗' : '👤';
        const time = new Date().toLocaleTimeString();
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${content}</p>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add to chat history
        this.chatHistory.push({ role, content, timestamp: new Date() });
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🥗</div>
            <div class="message-content">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    sendBotMessage(message) {
        this.addMessage(message, 'bot');
    }

    handleQuickAction(action) {
        const actions = {
            mood: "How are you feeling after your recent meals?",
            plan: "Let's plan your next meal! What are you in the mood for?",
            progress: "Let me check your progress and give you some insights.",
            tips: "Here are some personalized nutrition tips for you!"
        };
        
        const message = actions[action];
        if (message) {
            document.getElementById('message-input').value = message;
            this.sendMessage();
        }
    }

    toggleProfile() {
        const content = document.getElementById('profile-content');
        const toggle = document.getElementById('toggle-profile');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggle.textContent = '−';
        } else {
            content.style.display = 'none';
            toggle.textContent = '+';
        }
    }

    minimizeChat() {
        const container = document.querySelector('.chatbot-container');
        container.style.height = '80px';
        container.style.overflow = 'hidden';
        
        document.getElementById('mode-selection').style.display = 'none';
        document.getElementById('chat-interface').style.display = 'none';
        document.querySelector('.chatbot-header').style.borderRadius = '20px';
    }

    closeChat() {
        // In a real app, this would close the chatbot
        // For demo purposes, we'll just minimize it
        this.minimizeChat();
    }

    updateCurrentTime() {
        const timeElements = document.querySelectorAll('#current-time');
        timeElements.forEach(el => {
            el.textContent = new Date().toLocaleTimeString();
        });
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new NutriKartChatbot();
});

// Export for use in other files
window.NutriKartChatbot = NutriKartChatbot;
