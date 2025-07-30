# Mastery CLI

![](https://media.giphy.com/media/eveBk0ptKzjqUe0iTg/giphy.gif)

Docs: https://nenewang.github.io/mastery-cli/
compiled build: https://k00.fr/lak37m7l

Mastery CLI: Your Command Line Assistant for Programmer Development"

Mastery CLI is a comprehensive tool designed to boost your programming skills. It features flashcards, DSA practice, statistics, and habit hooks. For instance, every commit now triggers a random flashcard or suggests a DSA problem to solve, fostering continuous learning.




| features                                                                | img                                   |
| ----------------------------------------------------------------------- | ------------------------------------- |
| Convert your Markdown Notes into Flashcards                             | ![alt text](img/markdown-toimage.png) |
| Upgrade your skills, and keep record of your progress with Mastery CLI. | ![alt text](img/progress-record.png)      |



Key Highlights:

- Easily track personal project goals, such as daily commits.
- Access over 150 offline programming problems with accompanying offline tests and a built-in compiler.
- Utilize an offline algorithm that identifies weaknesses and generates quick flashcards for memory refresh.
- Enjoy free flashcard decks covering Computer Science Architecture, Networking, AWS, System Design, Design Patterns, and more. Plus, easily share your flashcard decks.


## Install and Test.
```
npm install -g mastery-cli
mcli report
mcli quiz
mcli report
```

- You need to install nvim for the dsa option to work
- Eventually you would be able to select your own editor.


Currently under development.
- We are cleaning up the codebase, and adding more features.
- Currently 100% offline. So that this can be used in corporate environments. (not sending any data to the cloud, and all is local)
- We are removing unused libraries to keep it as clean as possible, some libraries use local ones that you might need to install using:

```
npm install file:custom_modules/node-json-db-1.0.1
npm install file:custom_modules/terminal-charter-master
```


Setup your editor in `utils/dsa-cli/user_files/temp_settings.json` to use your preferred editor for DSA problems.


## Help

We support multiple ways to call the cli, for instance, you can use `mastery-cli`, `mastery`, or `mcli` to access the tool. 

Supported calls:

```
mcli
mastery
m-cli
```

### Settings.

Change the editor in 

```
utils/dsa-cli/user_files/temp_settings.json
```

## Usage

Commiting a code and pushing it to HEAD

```
mcli coa "Commit message"
```


![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzYzYzU5NWJiMjNhNThkYzBkNTJlM2MxNjFjZjdiNzJiMTZhMGVmOSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/JavdJQ8YjfQyOq0Cfy/giphy.gif)

Reporting:

```
mcli report
```


Help 

```
mcli --help
```


## Skills Integration

Now you can track locally the type of cards you are studying, and the type of problems you are solving.
You will be able to see the progress of your skills, and the type of problems you are solving.

```
mcli skill
```


To add a skill




### Data Structures and Algorithms 
We have a collection of DSA problems that you can solve.

View DSA problems:
```
mcli dsa
```

- We keep track of solved problems, as well as new problems.




View all DSA Problems

```
mcli dsa --all
```

### Flashcards

```
mcli term
```

Math Problems:

```
mcli math
```



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
