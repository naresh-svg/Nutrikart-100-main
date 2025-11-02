// NutriKart Assistant with Gemini API
class NutriKartAssistant {
    constructor() {
        this.chatHistory = [];
        this.isTyping = false;
        this.messageCount = 0;
        this.geminiApiKey =  'AIzaSyCMlN9eSb-PwFzqgT9-R0eWIq7WjJ3-Na4'; // replace with your Gemini API key

        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = `
            <div class="message bot-message">
                <div class="message-content">
                    <p>👋 Hi! I'm your <b>NutriKart AI Assistant</b> powered by Gemini. Ask me about diet plans, healthy meals, or nutrition facts!</p>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        document.getElementById('send-btn').addEventListener('click', () => this.sendMessage());
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        document.getElementById('refresh-btn').addEventListener('click', () => this.resetConversation());
        document.getElementById('close-btn').addEventListener('click', () => this.resetConversation());
    }

    async sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        this.showTypingIndicator();

        try {
            const response = await this.getGeminiResponse(message);
            this.hideTypingIndicator();
            this.addMessage(this.formatResponse(response), 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage("⚠️ Sorry, I’m having trouble connecting to Gemini. Please check your API key or try again later.", 'bot');
            console.error('Gemini API Error:', error);
        }
    }

    async getGeminiResponse(userMessage) {
        const model = "models/gemini-2.0-flash-exp";

        const body = {
            contents: [
                { role: "user", parts: [{ text: userMessage }] }
            ]
        };

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${this.geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);

        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t generate a response.";
    }

    // 🧠 Converts Markdown-like output into clean HTML
    formatResponse(text) {
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // bold
            .replace(/\*(.*?)\*/g, '<i>$1</i>') // italics
            .replace(/^- (.*$)/gim, '<li>$1</li>') // bullet points
            .replace(/\n/g, '<br>'); // line breaks

        // Wrap list items in <ul>
        html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');

        // Detect table-like text and format it
        if (text.includes('|')) {
            html = `<div class="table-container"><pre>${text}</pre></div>`;
        }

        return html;
    }

    addMessage(content, role) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
    
        // Convert Markdown-like syntax to HTML
        const formatted = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // italic
            .replace(/`(.*?)`/g, '<code>$1</code>') // inline code
            .replace(/\n/g, '<br>') // line breaks
            .replace(/- (.*?)(?=<br>|$)/g, '<li>$1</li>'); // bullet points
    
        // Wrap bullet points inside a list if any exist
        const finalFormatted = formatted.includes('<li>')
            ? formatted.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
            : formatted;
    
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${finalFormatted}</p>
            </div>
        `;
    
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    

    showTypingIndicator() {
        if (this.isTyping) return;
        this.isTyping = true;

        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';

        typingDiv.innerHTML = `
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
        if (typingIndicator) typingIndicator.remove();
    }

    resetConversation() {
        this.chatHistory = [];
        this.showWelcomeMessage();
    }
}

// Initialize assistant
document.addEventListener('DOMContentLoaded', () => new NutriKartAssistant());