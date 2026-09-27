# AGENTS.md - Roll20 Character Sheet Development Guide

## Project Overview

This is a **Roll20 Character Sheet** for the Palladium Rifts tabletop role-playing game system. This is NOT a standalone web application or traditional web development project. All code must be written specifically for the Roll20 platform and its character sheet system.

## Critical Development Guidelines

### 1. Roll20 Character Sheet Architecture

- **Main Files**: `rifts.html` (character sheet HTML) and `rifts.css` (styling)
- **Build System**: Uses Gulp with SCSS compilation and HTML injection
- **Source Structure**: Source files are in `src/` directory, compiled output goes to `dist/`
- **Sheet Configuration**: Defined in `sheet.json` with user options and metadata

### 2. Roll20-Specific Requirements

#### HTML Structure
- Use Roll20's character sheet HTML syntax and conventions
- All form inputs must use `name` attributes for Roll20's attribute system
- Use `@{attribute_name}` syntax for referencing character attributes
- Implement proper roll buttons with Roll20's roll syntax: `&{template:template_name} {{field=value}}`
- Use repeating sections with `repeating_sectionname` naming convention

#### CSS Styling
- Follow Roll20's CSS guidelines and limitations
- Use SCSS for development (compiled to CSS)
- Avoid external dependencies or frameworks
- Test compatibility with Roll20's dark mode
- Ensure responsive design works within Roll20's interface

#### JavaScript/Functionality
- Use Roll20's sheet worker scripts for dynamic functionality
- Implement proper event handlers for Roll20's sheet events
- Follow Roll20's API for character data manipulation
- Use Roll20's roll templates for consistent dice rolling

### 3. Development Workflow

#### Build Process
```bash
npm install          # Install dependencies
npm run watch        # Start development with auto-rebuild
```

#### File Organization
- **Source Files**: Edit files in `src/` directory
- **Partials**: HTML components in `src/partials/`
- **SCSS**: Stylesheets in `src/scss/`
- **Output**: Compiled files in `dist/` directory

#### Testing
- Test changes in Roll20's character sheet editor
- Verify roll functionality works correctly
- Check compatibility with different browsers
- Test user options functionality

### 4. Game System Specifics

#### Palladium Rifts Mechanics
- Complex attribute system (IQ, ME, MA, PS, PP, PE, PB, Spd)
- Multiple damage types (SDC, MDC, HP)
- Extensive skill system with percentages
- Magic and psionic powers
- Combat mechanics with multiple attack types
- Armor system with multiple layers

#### Character Sheet Features
- Multiple tabs (Core, Combat Skills, Magic, Psionics, etc.)
- Active Profile system for quick reference
- Modifier system for bonuses/penalties
- Import/Export functionality
- User-configurable options
- Roll templates for various game mechanics

### 5. Code Standards

#### HTML
- Use semantic HTML5 elements where appropriate
- Maintain accessibility standards
- Follow Roll20's naming conventions
- Include proper form validation attributes

#### CSS/SCSS
- Use BEM methodology for CSS classes
- Maintain consistent spacing and typography
- Ensure cross-browser compatibility
- Optimize for Roll20's rendering engine

#### JavaScript
- Use modern ES6+ features compatible with Roll20
- Implement proper error handling
- Follow Roll20's sheet worker patterns
- Document complex game mechanics

### 6. Common Pitfalls to Avoid

- **Don't** use external CSS frameworks (Bootstrap, etc.)
- **Don't** implement features that require server-side processing
- **Don't** use JavaScript libraries not supported by Roll20
- **Don't** break existing roll functionality
- **Don't** ignore Roll20's character sheet guidelines
- **Don't** implement features that conflict with Roll20's API

### 7. Testing Checklist

Before submitting changes:
- [ ] All roll buttons function correctly
- [ ] Character attributes save and load properly
- [ ] User options work as expected
- [ ] Import/Export functionality preserved
- [ ] Dark mode compatibility maintained
- [ ] Responsive design works on different screen sizes
- [ ] No JavaScript errors in browser console
- [ ] All game mechanics function according to Palladium Rifts rules

### 8. Resources

- [Roll20 Character Sheet Development](https://wiki.roll20.net/Character_Sheet_Development)
- [Roll20 Sheet Worker Scripts](https://wiki.roll20.net/Sheet_Worker_Scripts)
- [Roll20 Roll Templates](https://wiki.roll20.net/Roll_Templates)

## Remember

This is a **Roll20 Character Sheet**, not a standalone application. Every line of code must be compatible with Roll20's platform and serve the specific needs of Palladium Rifts players using Roll20 for their tabletop gaming sessions.
