# User Management Implementation

## Overview
This document describes the implementation of the user management feature and enhanced navigation for the Edoha frontend application.

## Components Implemented

### 1. Layout Components

#### Sidebar Component (`layouts/default/components/sidebar/`)
- Expandable menu structure with Angular Material expansion panels
- Three main menu sections:
  - **Home**: Direct link to homepage
  - **Usuário** (User): User management submenu
    - Gerenciar Usuários (List users)
    - Adicionar Usuário (Add user)
    - Perfis e Permissões (Permissions - placeholder)
  - **Rifa** (Lottery): Lottery management submenu (placeholders)
  - **Instituições** (Institutions): Institution management submenu (placeholders)
- Responsive design that collapses on smaller screens
- Active route highlighting

#### Header Component (`layouts/default/components/header/`)
- Logo display with "edoha" branding
- Theme toggle button (dark/light mode)
- User menu dropdown with:
  - User nickname display
  - Settings option (placeholder)
  - Logout functionality
- Mobile-responsive hamburger menu toggle

#### Updated Default Layout (`layouts/default/`)
- Integrated header and sidebar components
- Responsive drawer behavior:
  - Side mode on desktop (always visible)
  - Over mode on mobile/tablet (toggleable)
- Uses Angular CDK BreakpointObserver for responsive behavior

### 2. User Management Module

#### User List Component (`features/user/user-list/`)
- Material table displaying users with columns: Name, Nickname, Phone, Actions
- Search functionality across name, nickname, and phone fields
- Client-side pagination (5, 10, 25, 50 items per page)
- Action buttons:
  - Edit (navigates to edit form)
  - Delete (opens confirmation dialog)
- Loading spinner during API calls
- Snackbar notifications for success/error states

#### User Form Component (`features/user/user-form/`)
- Dynamic form using ngx-formly with Material UI
- Supports both Add and Edit modes
- Form fields:
  - Name (required)
  - Nickname (required)
  - Phone (required)
  - Password (required for creation, optional for edit)
  - User Type ID (required)
- Form validation with error messages
- Cancel and Save buttons
- Automatic navigation back to list after save
- Loading state during API operations

#### Confirm Dialog Component (`shared/components/confirm-dialog/`)
- Reusable confirmation dialog
- Configurable title, message, and button text
- Used for delete confirmations
- Returns boolean result on close

### 3. Services

#### User Service (`core/services/requests/user.service.ts`)
- Complete CRUD operations:
  - `getAll()`: Fetch all users
  - `getById(id)`: Fetch single user
  - `create(dto)`: Create new user
  - `update(dto)`: Update existing user
  - `delete(id)`: Delete user
- Integrates with API routes
- Type-safe using DTOs

### 4. Models and Interfaces

#### User DTOs (`core/models/user/user.dto.ts`)
- `UserDTO`: User entity interface
- `CreateUserDTO`: DTO for creating users
- `UpdateUserDTO`: DTO for updating users (includes ID)
- `UserCredentials`: Interface for authentication

### 5. Routing

#### Updated Routes (`app.routes.ts`)
- `/` - Home (protected by authGuard)
- `/users` - User list (protected by authGuard)
- `/users/new` - Add new user (protected by authGuard)
- `/users/:id/edit` - Edit user (protected by authGuard)

All user routes are protected by the existing authGuard.

## API Integration

The application integrates with the backend API at `https://localhost:7021` (configurable in `environment.ts`).

### API Endpoints Used:
- `GET /User` - List all users
- `GET /User/:id` - Get user by ID
- `POST /User` - Create new user
- `PUT /User` - Update user
- `DELETE /User/:id` - Delete user

## Authentication

- Uses JWT tokens stored in sessionStorage
- Auth interceptor automatically adds tokens to requests
- Logout functionality clears all session data
- Protected routes redirect to login if not authenticated

## UI/UX Features

### Responsive Design
- Desktop: Sidebar always visible, full-width header
- Tablet/Mobile: Collapsible sidebar (hamburger menu), compact header

### User Feedback
- Loading spinners during API calls
- Success snackbars (green) for successful operations
- Error snackbars (red) for failures
- Confirmation dialogs before destructive actions

### Form Validation
- Required field indicators (*)
- Real-time validation feedback
- Submit button disabled when form is invalid
- Clear error messages in Portuguese

## Technologies Used

- **Angular 20.2.0**: Core framework
- **Angular Material 21.0.5**: UI components
- **ngx-formly 7.0.1**: Dynamic forms
- **RxJS**: Reactive programming
- **TypeScript**: Type-safe development

## Future Enhancements

The following placeholder routes are included in the sidebar but not yet implemented:
- User permissions management
- Lottery (Rifa) management
- Institution management
- Settings page

## Testing Notes

To test the user management functionality:
1. Log in with valid credentials
2. Navigate to "Gerenciar Usuários" from the sidebar
3. Use the search bar to filter users
4. Click "Adicionar Usuário" to create a new user
5. Click edit icon on any user to modify their data
6. Click delete icon and confirm to remove a user

Note: The backend API must be running at `https://localhost:7021` for full functionality.
