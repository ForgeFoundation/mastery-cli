# Mastery CLI Extension System

The Mastery CLI features a professional extension system that allows for modular functionality and easy extensibility. Extensions are automatically discovered and loaded from this directory.

## Features

- **Automatic Discovery**: Extensions are automatically found and loaded
- **Professional Architecture**: Built with enterprise-grade patterns
- **Type Safety**: Comprehensive validation and error handling  
- **Hot Reloading**: Extensions can be updated without application restart (in development)
- **Hook System**: Extensions can listen to application events
- **Command Registration**: Clean command namespace management
- **Dependency Management**: Extensions can declare and validate dependencies

## Architecture

### Core Components

1. **ExtensionManager**: Central orchestrator for extension lifecycle
2. **ExtensionModel**: Base class providing standard interface
3. **Command System**: Structured command definitions and handlers
4. **Hook System**: Event-driven architecture for extension interaction

### Extension Lifecycle

1. **Discovery**: Scan extensions directory for valid extensions
2. **Loading**: Import and instantiate extension classes
3. **Validation**: Verify extension implements required interfaces
4. **Registration**: Register commands and hooks with the system
5. **Initialization**: Call extension initialize() methods
6. **Runtime**: Handle commands and execute hooks
7. **Cleanup**: Graceful shutdown and resource cleanup

## Current Extensions

### DemoExtension
- **Purpose**: Demonstrates extension system capabilities
- **Commands**: `sample`, `demo-info`  
- **Features**: Shows hooks, command handling, and system integration

### MasteryDSAExtension  
- **Purpose**: Data structures and algorithms practice
- **Commands**: `dsa`, `mdsa`, `cloze`
- **Features**: Interview preparation, coding challenges, performance tracking

### DataScienceExtension
- **Purpose**: Data science and machine learning practice  
- **Commands**: `jupyter`
- **Features**: Jupyter notebook integration, ML workflow practice

## Creating Extensions

See [EXTENSION_TEMPLATE.md](./EXTENSION_TEMPLATE.md) for a complete guide on creating new extensions.

### Quick Start

1. Create directory: `src/extensions/my-extension/`
2. Create `extension.js` with ExtensionModel class
3. Implement required `getHandles()` method
4. Restart application - extension loads automatically

### Directory Structure

```
src/extensions/
├── README.md                    # This file
├── EXTENSION_TEMPLATE.md        # Development template  
├── ExtensionManager.js          # Core extension manager
├── models.js                   # Base models and interfaces
├── demo/                       # Demo extension
│   └── extension.js
├── dsa-cli/                    # DSA practice extension
│   ├── extension.js
│   ├── dsa-trainer.js
│   └── ...
└── data-science-cli/           # Data science extension
    ├── extension.js
    └── ...
```

## Extension System Commands

### `mastery extensions`
Shows extension system status, loaded extensions, and available commands.

Example output:
```
=== Extension System Status ===
Extensions Loaded: 3
Commands Registered: 6
Hooks Registered: 2

=== Loaded Extensions ===
• DemoExtension v1.0.0 by Mastery CLI Team
  Demo Extension showcasing the extension system capabilities
• MasteryDSAExtension v1.0.0 by Mastery CLI Team  
  Data Structures and Algorithms practice extension
```

## API Reference

### ExtensionModel Methods

#### Required Methods
- `getHandles(context)` - Return command handlers object

#### Optional Methods  
- `initialize(context)` - Setup tasks after loading
- `getCommands()` - Command definitions for help system
- `getHooks(context)` - Event hook registrations
- `cleanup()` - Resource cleanup before unloading

### ExtensionManager API

- `loadAllExtensions(context)` - Load all discovered extensions
- `getCommandHandler(command)` - Get handler for specific command
- `getRegisteredCommands()` - List all registered commands
- `executeHooks(hookName, data)` - Execute all hooks for an event
- `getStatus()` - Get system status information

## Event Hooks

Extensions can register for these system events:

- `before-command` - Fired before any command execution
- `after-command` - Fired after any command execution  
- `system-startup` - Fired during application initialization
- `system-shutdown` - Fired during application shutdown

## Error Handling

The extension system includes comprehensive error handling:

- **Load Failures**: Extensions that fail to load are logged but don't crash the system
- **Command Conflicts**: Duplicate command names are detected and reported
- **Validation Errors**: Extensions must implement required interfaces
- **Runtime Errors**: Extension errors are isolated and don't affect other extensions

## Performance Considerations

- Extensions are loaded synchronously at startup
- Command handlers are cached for fast lookup
- Hook execution is asynchronous for better performance
- Memory usage is monitored for loaded extensions

## Security

- Extensions run with same privileges as main application
- No sandboxing - extensions have full system access
- Validation ensures extensions follow expected patterns
- Loading is restricted to the extensions directory

## Development Tips

1. **Use Descriptive Names**: Command names should be clear and unique
2. **Handle Errors Gracefully**: Always provide user-friendly error messages  
3. **Follow Patterns**: Look at existing extensions for examples
4. **Test Thoroughly**: Extensions can affect the entire application
5. **Document Commands**: Provide good help text and examples

## Troubleshooting

### Extension Not Loading
- Check that extension.js exports a class extending ExtensionModel
- Verify the class implements getHandles() method
- Check console for specific error messages

### Command Not Working
- Ensure command is registered in getHandles() return object
- Verify command handler is a function
- Check for command name conflicts with other extensions

### Missing Dependencies
- Implement validateDependencies() method
- Check that required modules are installed
- Verify context objects contain expected properties