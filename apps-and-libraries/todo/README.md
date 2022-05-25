# To Do List Manager

A Web Application for securely managing a To Do List

## Business Requirements

The To Do Manager application has the following overall requirements:

- Designed to match the mock-up
  - Header, Main Section Footer
  - Use [React Bootstrap](https://react-bootstrap.github.io/) for styling and visual components
- The header should present the application title and main menu
  - Home Link, which shows the list of To Do Items as noted below
  - A Login/Register/User section
    - When a user is **not logged in**:
      - Show Login and Register links
        - Login: Renders a Login Form
        - Register: Renders a new user registration form
          - Require Fields:: Username, Password, Email, Role
    - When a user **is logged in**:
      - Show "Welcome **username**"
      - Show a "Logout" link
        - When clicked, this should remove any cookies you have set and remove access
- In the "Main" section
  - Nothing should be visible until a user has logged in successfully
  - **The list of items in the to do list**
    - Based on user preferences, show listings in groups of (5, 10, etc) and provide the ability to view multiple "pages" of results
    - Each item in list should show the text of the item as well as the assignee
      - Based on user preferences, hide or show completed items
      - If shown, completed items should be styled differently making their status visually obvious
    - For users with "Update" permissions
      - When an item is clicked, toggle the "complete" status of the item.
    - For users with "Delete" permissions
      - Items should have a delete button associated with them
        - When clicked, remove the item from the list
  - For users with "Create" permissions ...
    - **A Form where the user can a new item to the todo list**
      - Items should have the following fields:
        - To Do Item Text
        - Assigned To
        - Status (complete/incomplete)
        - Difficulty (number between 1 and 5)
        - i.e.

          ```javascript
          const todo = mongoose.Schema({
            text: { type: String, required: true },
            assignee: { type: String },
            complete: { type: Boolean, default:false },
            difficulty: { type: Number, default: 1 },
          });
          ```

### Example

[Live Example](https://todo-list-manager.netlify.app/)

Users/Passwords for example app, each with different permissions:

- admin/ADMIN
- editor/EDITOR
- guest/GUEST

## Technical Requirements

The application will be created with the following overall architecture and methodologies

1. React
1. ES6 Classes
1. Settings delivered to the application using Context
1. User Login & Permissions delivered to the application using Context
1. Local Storage / Cookies for storing login status
1. Local Storage / Cookies for storing user preferences
1. Superagent or Axios for performing API Requests
1. React Bootstrap for styling
1. Test Driven Development, using Jest
   - Tests will be runnable locally
1. Deployment to cloud provider

### Application Structure (proposed)

```text
├── .gitignore
├── .eslintrc.json
├── __tests__
│   ├── todo.test.js
│   ├── auth.test.js
├── src
│   ├── index.js
│   ├── app.js
│   ├── context
│   │   ├── auth
│   │   │   └── context.js
│   │   │   └── auth.js
│   │   │   └── login.js
│   │   ├── settings
│   │   │   └── context.js
│   ├── components
│   │   ├── if
│   │   │   └── if.js
│   │   ├── todo
│   │   │   └── form.js
│   │   │   └── list.js
│   │   ├── footer
│   │   │   └── footer.js
│   │   ├── header
│   │   │   └── header.js
└── package.json
```

## Development Process, Milestones

> At every stage of development, the application should be publicly deployed

1. **Phase 1: Application Setup**
   - Basic To Do List Management, using Hooks
1. **Phase 2: Persistence**
   - Implement a custom Form Hook
   - Implement a custom Ajax Hook
   - Connect to a live API for storing To Do Items
1. **Phase 3: Settings and Global Context**
   - Implement user settings for displaying items
1. **Phase 4: Authorization**
   - Require a login to access the list
   - Restrict access to adding, editing, deleting to certain user types
