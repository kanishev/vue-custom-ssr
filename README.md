# Vue Vite Custom SSR

It's a simple representation of custom SSR implementation within Vue 3 environment

⚠️ **Note**: This project represents a **basic** SSR concept, created primarily to understand the core principles of Server-Side Rendering.
It's not a guide and not a Production-Ready Framework.

## Key Features
- Server-Side Rendering (SSR) support
- Custom async data fetching
- Server/client state synchronization

## Server-Side Rendering

The application handles SSR by:
- Fetching data on the server when server: true is set
- Serializing the initial state to the client
- Hydrating the client-side application with the server-rendered content

## Data Fetching

The application provides a custom **useAsyncData** composable for handling asynchronous data fetching with SSR support.

```
import { useAsyncData } from './composables/useAsyncData';

// Example usage in a component
const { data, error, loading, refresh } = await useAsyncData(
    'user-data', // unique key for state management
    async () => {
        // Your data fetching logic
        const response = await fetch('/api/user');
        return response.json();
    },
    { server: true } // options
);

```

Parameters:
1. key: A unique key to identify and store the data in the initial state
2. handler: A function that returns a promise with your data
3. options:
	- server: Whether to fetch data on server (default: true)

## State Management

### Custom State System
The application provides a custom state management system that works seamlessly with SSR through the **useState** function.

The useState function creates or retrieves a reactive state value that persists between server and client.

```
import { useState } from './state';

// Basic usage
const counter = useState('counter', () => 0);

// With complex initial state
const user = useState('user', () => ({
    name: 'John',
    age: 30
}));


```
### Pinia Integration
- Full support for Pinia state management
- SSR compatibility
- DevTools support
- Modular store architecture

## Run project

Install dependencies:
```sh
npm i
```

Run in development mode:
```sh
npm run dev
```

Build project:
```sh
npm run build
```

Start production server:
```sh
npm run serve
```