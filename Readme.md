# Mastery CLI 🎯

**A beginner-friendly command-line tool for learning programming concepts through flashcards and algorithm practice**

Turn your study notes into interactive flashcards and practice data structures & algorithms - all from your terminal!

## ✨ What Can You Do?

- 📚 **Convert Markdown notes to flashcards** - Turn your study notes into interactive learning sessions
- 🧠 **Practice algorithms & data structures** - Solve coding problems step by step
- 📊 **Track your progress** - See your learning stats and improvement over time
- ⚡ **Quick setup** - Get started in minutes

## 🚀 Quick Start

### 1. Install
```bash
npm install -g mastery-cli
```

### 2. Run Your First Flashcard Session
```bash
mastery term
```

### 3. Practice Algorithms
```bash
mastery dsa
```

### 4. See All Commands
```bash
mastery --help
```

## 📋 Available Commands

| Command | Description | Perfect For |
|---------|-------------|-------------|
| `mastery term` | Study flashcards from your notes | Learning new concepts |
| `mastery dsa` | Practice coding problems | Algorithm interviews |
| `mastery quiz` | Mixed quiz session | Quick review |
| `mastery report` | View your progress stats | Tracking improvement |
| `mastery settings` | Configure your preferences | Customization |



## 📖 How to Create Flashcards

Create a `.md` file with this format:

```markdown
# My Study Notes

## JavaScript Concepts

### What is a closure?
A function that has access to variables in its outer scope even after the outer function returns.

### What is hoisting?
JavaScript's behavior of moving declarations to the top of their scope during compilation.
```

Then run `mastery term` to study these as flashcards!

## 🎯 Algorithm Practice

The tool includes hundreds of coding problems:
- **Easy to Hard difficulty levels**
- **Step-by-step hints**
- **Multiple programming languages**
- **Progress tracking**

## ⚙️ Configuration

First time? The tool will create a `settings.json` file for you. You can customize:
- Study session length
- Difficulty preferences  
- Progress tracking options

## 🆘 Need Help?

- Run `mastery --help` for all commands
- Each command has detailed prompts to guide you
- Settings are explained when you first run the tool

## 🎓 Perfect For

- **Programming students** learning new concepts
- **Job seekers** preparing for technical interviews  
- **Developers** wanting to improve their skills
- **Anyone** who learns better with spaced repetition

## 🔧 For Developers

Want to contribute or understand the code better?

### Project Structure
```
src/
├── extensions/          # Feature modules
│   └── dsa-cli/        # Algorithm practice features
├── terms_data/         # Built-in flashcard content
├── user_data/          # Your personal settings and progress
└── utils/              # Helper functions
```

### Key Files
- `index.js` - Main entry point
- `src/constants.js` - Configuration constants
- `src/extensions/dsa-cli/` - All algorithm-related code
- `src/user_data/settings.json` - User preferences

### Adding New Features
1. Create a new extension in `src/extensions/`
2. Export your commands from the extension
3. The main CLI will automatically discover them

---

**Ready to level up your programming skills? Start with `mastery term` and begin your learning journey! 🚀**
