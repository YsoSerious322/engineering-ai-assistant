// System prompt for the engineering student chatbot
const SYSTEM_PROMPT = `Role:
You are a professional AI assistant designed for engineering undergraduate students.

Purpose:
Your primary goal is to provide comprehensive support with:
- Engineering concepts and problem-solving
- Image analysis (diagrams, circuits, equations, graphs, technical drawings)
- University academic guidance
- Study strategies and time management
- Technology and software development
- Code review and debugging
- Technical documentation analysis

Behavior Guidelines:
- Be professional, clear, and knowledgeable
- Provide detailed, accurate explanations
- Use technical terminology appropriately with clear definitions
- Break down complex concepts into understandable steps
- When analyzing images, be thorough and precise
- Encourage critical thinking and deeper understanding
- Maintain academic integrity - guide learning, don't just provide answers

Response Style:
- Professional yet approachable
- Use structured formatting (bullet points, numbered lists)
- Provide examples and practical applications
- Include relevant formulas or equations when applicable
- For image analysis, describe what you see and explain its significance

Technical Depth:
- Provide comprehensive explanations
- Include relevant calculations and derivations when requested
- Reference standard engineering principles and theories
- Suggest additional resources when appropriate

Limitations:
- Acknowledge when uncertain
- Recommend verification of critical calculations
- Direct to appropriate resources for specialized topics`;

// Configuration and state
let config = {
    apiProvider: 'openai',
    apiKey: '',
    apiModel: 'auto'
};

let conversationHistory = [];
let isProcessing = false;
let selectedImage = null;
let selectedImageBase64 = null;

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeModal');
const saveSettings = document.getElementById('saveSettings');
const apiProvider = document.getElementById('apiProvider');
const apiKey = document.getElementById('apiKey');
const apiModel = document.getElementById('apiModel');
const statusText = document.getElementById('statusText');
const apiStatus = document.getElementById('apiStatus');
const imageInput = document.getElementById('imageInput');
const imageUploadBtn = document.getElementById('imageUploadBtn');
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');
const removeImageBtn = document.getElementById('removeImageBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    setupEventListeners();
    autoResizeTextarea();
});

// Load settings from localStorage
function loadSettings() {
    const savedProvider = localStorage.getItem('apiProvider');
    const savedKey = localStorage.getItem('apiKey');
    const savedModel = localStorage.getItem('apiModel');
    
    if (savedProvider) {
        config.apiProvider = savedProvider;
        apiProvider.value = savedProvider;
    }
    
    if (savedModel) {
        config.apiModel = savedModel;
        apiModel.value = savedModel;
    }
    
    if (savedKey) {
        config.apiKey = savedKey;
        apiKey.value = savedKey;
        enableChat();
    }
}

// Save settings to localStorage
function saveSettingsToStorage() {
    config.apiProvider = apiProvider.value;
    config.apiKey = apiKey.value.trim();
    config.apiModel = apiModel.value;
    
    if (config.apiKey) {
        localStorage.setItem('apiProvider', config.apiProvider);
        localStorage.setItem('apiKey', config.apiKey);
        localStorage.setItem('apiModel', config.apiModel);
        enableChat();
        settingsModal.classList.remove('active');
        showNotification('Settings saved successfully! Vision AI enabled.');
    } else {
        showNotification('Please enter an API key', true);
    }
}

// Enable chat functionality
function enableChat() {
    userInput.disabled = false;
    sendBtn.disabled = false;
    imageUploadBtn.disabled = false;
    statusText.textContent = 'Connected - Vision AI Ready';
    document.querySelector('.status-indicator').classList.add('active');
}

// Setup event listeners
function setupEventListeners() {
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    userInput.addEventListener('input', autoResizeTextarea);
    
    imageUploadBtn.addEventListener('click', () => {
        imageInput.click();
    });
    
    imageInput.addEventListener('change', handleImageSelect);
    removeImageBtn.addEventListener('click', clearImage);
    
    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });
    
    closeModal.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });
    
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });
    
    saveSettings.addEventListener('click', saveSettingsToStorage);
}

// Handle image selection
function handleImageSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', true);
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
        selectedImage = file;
        selectedImageBase64 = event.target.result;
        previewImage.src = event.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Clear selected image
function clearImage() {
    selectedImage = null;
    selectedImageBase64 = null;
    imagePreview.style.display = 'none';
    previewImage.src = '';
    imageInput.value = '';
}

// Auto-resize textarea
function autoResizeTextarea() {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
}

// Send message
async function sendMessage() {
    const message = userInput.value.trim();
    
    if ((!message && !selectedImage) || isProcessing) return;
    
    isProcessing = true;
    const messageText = message || 'Please analyze this image.';
    const hasImage = !!selectedImage;
    const imageData = selectedImageBase64;
    
    userInput.value = '';
    autoResizeTextarea();
    
    // Add user message to chat
    addMessage(messageText, 'user', hasImage ? imageData : null);
    
    // Build conversation entry
    const userMessage = {
        role: 'user',
        content: messageText
    };
    
    if (hasImage) {
        userMessage.image = imageData;
    }
    
    conversationHistory.push(userMessage);
    
    // Clear image after sending
    clearImage();
    
    // Show typing indicator
    const typingIndicator = showTypingIndicator();
    
    try {
        const response = await getAIResponse(messageText, hasImage ? imageData : null);
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add bot response to chat
        addMessage(response, 'bot');
        conversationHistory.push({ role: 'assistant', content: response });
        
    } catch (error) {
        typingIndicator.remove();
        addMessage(`Error: ${error.message}. Please check your API key and try again.`, 'bot');
    }
    
    isProcessing = false;
}

// Get AI response from selected provider
async function getAIResponse(message, imageBase64 = null) {
    switch (config.apiProvider) {
        case 'openai':
            return await getOpenAIResponse(message, imageBase64);
        case 'anthropic':
            return await getAnthropicResponse(message, imageBase64);
        case 'gemini':
            return await getGeminiResponse(message, imageBase64);
        default:
            throw new Error('Invalid API provider');
    }
}

// OpenAI API with Vision
async function getOpenAIResponse(message, imageBase64 = null) {
    const model = config.apiModel === 'auto' ? 'gpt-4o' : config.apiModel;
    
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT }
    ];
    
    // Add conversation history (text only, last 6 messages)
    const recentHistory = conversationHistory.slice(-6).filter(msg => !msg.image);
    messages.push(...recentHistory);
    
    // Add current message with image if present
    if (imageBase64) {
        messages.push({
            role: 'user',
            content: [
                { type: 'text', text: message },
                { 
                    type: 'image_url', 
                    image_url: { url: imageBase64 }
                }
            ]
        });
    } else {
        messages.push({ role: 'user', content: message });
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: messages,
            max_tokens: 1000,
            temperature: 0.7
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenAI API request failed');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Anthropic API with Vision
async function getAnthropicResponse(message, imageBase64 = null) {
    const model = config.apiModel === 'auto' ? 'claude-3-5-sonnet-20241022' : config.apiModel;
    
    const messages = [];
    
    // Add conversation history (last 6 messages)
    const recentHistory = conversationHistory.slice(-6).filter(msg => !msg.image);
    messages.push(...recentHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
    })));
    
    // Add current message with image if present
    if (imageBase64) {
        const base64Data = imageBase64.split(',')[1];
        const imageType = imageBase64.split(';')[0].split(':')[1];
        
        messages.push({
            role: 'user',
            content: [
                {
                    type: 'image',
                    source: {
                        type: 'base64',
                        media_type: imageType,
                        data: base64Data
                    }
                },
                { type: 'text', text: message }
            ]
        });
    } else {
        messages.push({
            role: 'user',
            content: message
        });
    }
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: model,
            max_tokens: 1000,
            system: SYSTEM_PROMPT,
            messages: messages
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Anthropic API request failed');
    }
    
    const data = await response.json();
    return data.content[0].text;
}

// Google Gemini API with Vision
async function getGeminiResponse(message, imageBase64 = null) {
    const model = imageBase64 ? 'gemini-1.5-flash' : 'gemini-pro';
    
    const contents = [];
    
    // Add system instruction as first message
    contents.push({
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }]
    });
    
    // Add current message
    const currentParts = [{ text: message }];
    
    if (imageBase64) {
        const base64Data = imageBase64.split(',')[1];
        const mimeType = imageBase64.split(';')[0].split(':')[1];
        
        currentParts.push({
            inline_data: {
                mime_type: mimeType,
                data: base64Data
            }
        });
    }
    
    contents.push({
        role: 'user',
        parts: currentParts
    });
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: contents,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000
            }
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Gemini API request failed');
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// Add message to chat
function addMessage(text, type, imageUrl = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Add image if present
    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Uploaded image';
        contentDiv.appendChild(img);
    }
    
    // Convert markdown-style formatting to HTML
    const formattedText = formatMessage(text);
    const textContent = document.createElement('div');
    textContent.innerHTML = formattedText;
    contentDiv.appendChild(textContent);
    
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Format message with basic markdown support
function formatMessage(text) {
    // Replace line breaks
    text = text.replace(/\n\n/g, '</p><p>');
    text = text.replace(/\n/g, '<br>');
    
    // Bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Code blocks
    text = text.replace(/`([^`]+)`/g, '<code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace;">$1</code>');
    
    // Lists
    text = text.replace(/^- (.*?)(<br>|$)/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Numbered lists
    text = text.replace(/^\d+\. (.*?)(<br>|$)/gm, '<li>$1</li>');
    
    // Wrap in paragraph if not already wrapped
    if (!text.startsWith('<')) {
        text = '<p>' + text + '</p>';
    }
    
    return text;
}

// Show typing indicator
function showTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    
    messageDiv.appendChild(typingDiv);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return messageDiv;
}

// Show notification
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${isError ? '#ef4444' : '#22c55e'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
