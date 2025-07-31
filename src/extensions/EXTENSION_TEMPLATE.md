# Extension Development Template

This template helps you create professional extensions for the Mastery CLI.

## Creating a New Extension

1. Create a new directory in `src/extensions/` with your extension name
2. Create an `extension.js` file in your extension directory
3. Use the template below as your starting point

## Extension Template

```javascript
const { ExtensionModel, Command } = require('../models');

class YourExtension extends ExtensionModel {
    constructor(options = {}) {
        super(
            "YourExtensionName",        // Unique extension name
            "1.0.0",                    // Version number
            "Description of what your extension does", // Brief description
            "Your Name",                // Author name
            "MIT",                      // License (optional)
            options                     // Options passed from system
        );
    }

    /**
     * Initialize the extension (called after loading)
     * Use this for setup tasks, validating dependencies, etc.
     */
    async initialize(context = {}) {
        console.log(`Initializing ${this.name}...`);
        
        // Your initialization code here
        
        return await super.initialize(context);
    }

    /**
     * Define commands for help system and documentation
     */
    getCommands() {
        return {
            'your-command': new Command(
                'Description of what this command does',
                'your-command',
                {
                    usage: 'mastery your-command [options]',
                    examples: [
                        'mastery your-command',
                        'mastery your-command --option value'
                    ],
                    flags: {
                        '--option': 'Description of this flag'
                    }
                }
            )
        };
    }

    /**
     * Define command handlers (REQUIRED)
     * Map command names to their handler functions
     */
    getHandles({ flags, masteryManager, settings } = {}) {
        return {
            'your-command': this.handleYourCommand.bind(this)
        };
    }

    /**
     * Define event hooks (OPTIONAL)
     * Register for application events
     */
    getHooks(context = {}) {
        return {
            'before-command': this.beforeCommandHook.bind(this),
            'after-command': this.afterCommandHook.bind(this)
        };
    }

    /**
     * Command handler implementation
     */
    async handleYourCommand() {
        console.log('Your command is running!');
        
        // Access mastery manager if needed
        if (this.masteryManager) {
            console.log('✓ Extension has access to Mastery Manager');
            // this.masteryManager.increasePerformance('your-feature');
        }
        
        return { success: true, message: 'Command completed' };
    }

    /**
     * Hook handlers (optional)
     */
    async beforeCommandHook(data) {
        console.log(`${this.name}: Before command hook`);
        return { hookName: 'before-command', extension: this.name, data };
    }

    async afterCommandHook(data) {
        console.log(`${this.name}: After command hook`);
        return { hookName: 'after-command', extension: this.name, data };
    }

    /**
     * Cleanup resources (called before unloading)
     */
    cleanup() {
        console.log(`Cleaning up ${this.name}...`);
        super.cleanup();
    }
}

module.exports = YourExtension;
```

## Extension Guidelines

### Naming Conventions
- Extension class names should end with "Extension"
- Command names should use kebab-case (lowercase with hyphens)
- Use descriptive, unique command names to avoid conflicts

### Best Practices
1. **Error Handling**: Always wrap async operations in try-catch blocks
2. **User Feedback**: Provide clear console output for user actions
3. **Resource Cleanup**: Implement cleanup() if your extension uses resources
4. **Dependencies**: List any required dependencies in the constructor options
5. **Configuration**: Use the config system for user-configurable options

### Available Context
Extensions receive context objects with:
- `flags`: Command-line flags passed to the application
- `masteryManager`: Reference to the main Mastery instance
- `settings`: Application settings object

### Integration with Mastery System
- Use `this.masteryManager.increasePerformance(feature, value)` to log performance
- Use `this.masteryManager.logSkillExperience(skill, options)` to track learning
- Access settings via the context or `this.masteryManager.Settings`

### Testing Your Extension
1. Place your extension in `src/extensions/your-extension-name/`
2. Restart the application
3. Run `mastery extensions` to see if it loaded
4. Test your commands: `mastery your-command`

### File Structure
```
src/extensions/your-extension-name/
├── extension.js          # Main extension file
├── README.md            # Extension documentation
└── lib/                 # Additional modules (optional)
    └── helper.js
```

## Example Extensions
Look at the existing extensions for examples:
- `demo/extension.js` - Simple demonstration extension
- `dsa-cli/extension.js` - Complex extension with multiple commands
- `data-science-cli/extension.js` - Extension with external tool integration