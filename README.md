# ⚡ Engineering AI Assistant

A professional, AI-powered assistant designed for engineering students with advanced **text and image analysis** capabilities. Upload diagrams, circuits, equations, graphs, and get instant AI-powered insights.

## ✨ Key Features

### 🖼️ **Vision AI Capabilities**
- **Image Analysis**: Upload and analyze engineering diagrams, circuit schematics, equations, graphs, technical drawings
- **Multi-Modal Understanding**: Combines text and images for comprehensive responses
- **Real-time Processing**: Instant analysis with visual feedback

### 🤖 **Multiple AI Providers**
- **OpenAI GPT-4 Vision**: Industry-leading vision and text capabilities
- **Anthropic Claude 3 Sonnet**: Advanced reasoning with image understanding
- **Google Gemini Pro Vision**: Free tier available with excellent performance

### 💼 **Professional Features**
- Modern, sleek dark theme interface
- Responsive design for all devices
- Conversation history with context awareness
- Privacy-focused (all data stored locally)
- Auto model selection or manual override

## 🎯 What Can It Help With?

### Engineering & Technical
- **Circuit Analysis**: Understand circuit diagrams, identify components
- **Equation Solving**: OCR and solve mathematical equations from images
- **Graph Interpretation**: Analyze plots, charts, and technical graphs
- **Diagram Review**: Study system diagrams, flowcharts, block diagrams
- **Code Review**: Debug and improve code snippets

### Academic Support
- Engineering concepts and problem-solving
- Study strategies and exam preparation
- University life and academic guidance
- Technical documentation review
- Project planning and execution

## 🚀 Getting Started

### Step 1: Get an API Key

Choose one of these providers (you only need one):

| Provider | Cost | Best For | Get API Key |
|----------|------|----------|-------------|
| **Google Gemini** | ⭐ **FREE** tier | Students on budget | [Get Key](https://makersuite.google.com/app/apikey) |
| **OpenAI GPT-4** | Paid (pay-per-use) | Best quality | [Get Key](https://platform.openai.com/api-keys) |
| **Anthropic Claude** | Paid (pay-per-use) | Detailed analysis | [Get Key](https://console.anthropic.com/settings/keys) |

**Recommended for Students**: Start with **Google Gemini** (free tier)

### Step 2: Launch the App

**Option 1 - Double Click**: 
- Just double-click `index.html`

**Option 2 - Command Line**:
```bash
xdg-open /home/abdullah/Desktop/A2/index.html
# or
open index.html  # macOS
# or
start index.html  # Windows
```

**Option 3 - Browser**:
- Drag `index.html` into your browser

### Step 3: Configure Settings

1. Click **⚙️ Settings** button (top right)
2. Select your **API Provider**
3. Choose **Model** (or leave on "Auto" - recommended)
4. Paste your **API Key**
5. Click **Save Settings**
6. Status indicator turns **green** when ready!

### Step 4: Start Using!

**Text Questions**:
```
"Explain Ohm's law and its applications"
"How do I prepare for my circuits exam?"
"What's the difference between AC and DC?"
```

**Image Analysis**:
1. Click the **upload button** (📤 icon)
2. Select an image (circuit, diagram, equation, etc.)
3. Add a question or leave blank for general analysis
4. Press **Send**

## 💡 Use Cases & Examples

### 📊 Analyze Circuit Diagrams
Upload a circuit schematic and ask:
- "What type of circuit is this?"
- "Calculate the total resistance"
- "Identify the components and their values"

### 📐 Solve Equations
Upload handwritten or printed equations:
- "Solve this differential equation"
- "Verify my calculations"
- "Explain the steps to solve this"

### 📈 Interpret Graphs
Upload plots and charts:
- "What does this frequency response show?"
- "Analyze the trend in this data"
- "What are the key features of this graph?"

### 🔧 Debug Code
Paste or screenshot code:
- "Find the bug in this code"
- "Optimize this algorithm"
- "Explain how this function works"

### 📚 Study Materials
Upload textbook diagrams:
- "Explain this mechanical system"
- "How does this hydraulic system work?"
- "Break down this thermodynamic cycle"

## 🔒 Privacy & Security

✅ **Fully Client-Side**: Runs entirely in your browser  
✅ **Local Storage**: API keys stored only on your device  
✅ **No Backend**: No server collecting your data  
✅ **Direct API Calls**: Your queries go directly to your chosen AI provider  
✅ **No Tracking**: Zero analytics or data collection  

## 🛠️ Technical Specifications

### Tech Stack
- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript
- **Design**: Modern gradient theme with responsive layout
- **AI Integration**: OpenAI, Anthropic, Google APIs
- **Image Processing**: Base64 encoding, client-side only

### Browser Support
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Any modern browser with ES6+ support

### Image Requirements
- **Formats**: JPG, PNG, GIF, WebP
- **Size**: Recommended < 5MB (depends on API provider limits)
- **Resolution**: Any resolution (APIs auto-resize)

## ⚙️ Advanced Configuration

### Model Selection
The app supports manual model selection in Settings:

**OpenAI Models**:
- `gpt-4o` (Default) - Best quality, vision support
- `gpt-4-vision-preview` - Vision-optimized

**Anthropic Models**:
- `claude-3-5-sonnet-20241022` (Default) - Best balance
- `claude-3-sonnet-20240229` - Reliable performance
- `claude-3-opus-20240229` - Highest quality

**Google Models**:
- `gemini-1.5-flash` (with images) - Fast, free tier
- `gemini-pro` (text only) - Reliable performance

### Customization
Edit `script.js` to customize:
- **System Prompt**: Modify `SYSTEM_PROMPT` constant
- **Response Length**: Adjust `max_tokens` parameter
- **Temperature**: Control creativity (0.0-1.0)
- **History Length**: Change conversation context window

## 🐛 Troubleshooting

### "Configure API Key" Message
- Click Settings and add your API key
- Verify the key is valid and active
- Check you selected the correct provider

### API Errors
- **Invalid API Key**: Double-check your key
- **Rate Limit**: Wait a few moments or upgrade your plan
- **Quota Exceeded**: Check your provider dashboard for usage
- **Model Not Available**: Try "Auto" model selection

### Image Upload Issues
- **File Type**: Ensure it's JPG, PNG, GIF, or WebP
- **File Size**: Try compressing large images
- **API Support**: Ensure your API key supports vision models

### Slow Responses
- Image analysis takes longer than text
- Depends on API provider server load
- Check your internet connection
- Try a different API provider

## 💰 Cost Information

### Google Gemini
- **Free Tier**: 60 requests per minute
- **Best for**: Students and learning
- **Vision**: Included in free tier

### OpenAI GPT-4
- **Pricing**: ~$0.01-0.03 per request
- **Vision**: Additional cost for images
- **Best for**: Professional quality

### Anthropic Claude
- **Pricing**: ~$0.01-0.02 per request
- **Vision**: Included in pricing
- **Best for**: Detailed analysis

## 📝 Tips for Best Results

### For Text Questions
✅ Be specific and clear  
✅ Provide context when needed  
✅ Ask follow-up questions  
✅ Request examples or step-by-step explanations  

### For Image Analysis
✅ Use clear, well-lit images  
✅ Crop to relevant content  
✅ Include specific questions about the image  
✅ Ask for calculations or interpretations  
✅ Request comparisons or validations  

### Academic Integrity
⚠️ Use as a learning tool, not for cheating  
⚠️ Verify important calculations  
⚠️ Understand the explanations, don't just copy  
⚠️ Use to supplement, not replace, textbooks  

## 🎓 Example Conversations

```
You: [Upload circuit diagram] "Analyze this amplifier circuit"
AI: This is a common-emitter amplifier circuit...

You: "What's the voltage gain?"
AI: Based on the resistor values shown...

You: "How can I increase the gain?"
AI: You can increase the gain by...
```

## 📄 License

Free and open source for educational purposes.

## 🌟 Perfect For

- 🎓 Engineering Students
- 👨‍🏫 Self-learners
- 📚 Homework Help (understanding, not copying!)
- 🔬 Lab Report Analysis
- 📊 Data Interpretation
- 💻 Code Learning

---

## 🚀 Quick Start Summary

1. **Get free Gemini API key**: https://makersuite.google.com/app/apikey
2. **Open**: `index.html` in browser
3. **Settings**: Add your API key
4. **Chat**: Ask questions or upload images
5. **Learn**: Get instant AI-powered insights!

---

**Built for Engineering Students | Text & Vision AI | Professional Grade**

*Your AI companion for engineering success* ⚡
