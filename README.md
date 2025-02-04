# react-reducer-context

[![npm](https://img.shields.io/npm/v/react-reducer-context)](https://www.npmjs.com/package/react-reducer-context)
[![License](https://img.shields.io/npm/l/react-reducer-context)](LICENSE)

A lightweight, type-safe solution to simplify state management in React using `Context` and `useReducer`. Reduce boilerplate and improve performance while leveraging React's built-in tools. Created by **Arun Jagadish**.

---

## Why `react-reducer-context`?

Managing state in React often involves trade-offs between simplicity, performance, and scalability. While React's `useReducer` and `Context` are powerful, they require significant boilerplate and can cause unnecessary re-renders. This package solves those pain points by:

1. **Eliminating Boilerplate**: Automatically generates a context provider and hooks for state/dispatch.
2. **Optimizing Performance**: Separates state and dispatch into distinct contexts to prevent re-renders when only actions are dispatched.
3. **Staying Lightweight**: No external dependencies—just React and TypeScript.
4. **Enhancing Type Safety**: Full TypeScript support out of the box.

---

## Features

- ✅ **Zero Dependencies** (except React)
- ✅ **TypeScript-First** with strict type inference
- ✅ **Prevents Re-Renders** by splitting state and dispatch
- ✅ **Tiny Bundle Size** (<2KB)
- ✅ Works with React 16.8+ (Hooks) and Next.js, Remix, etc.

---

## Installation

```bash
npm install react-reducer-context@0.1.0
# or
yarn add react-reducer-context@0.1.0
```

## Basic Usage

### Step 1: Define Your Reducer and State

```jsx
// counter-context.ts
import { createReducerContext } from "react-reducer-context";

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export const { Provider, useStateContext, useDispatchContext } =
  createReducerContext(reducer, { count: 0 });
```

### Step 2: Wrap Your App with the Provider

```jsx
// App.tsx
import { Provider } from "./counter-context";

function App() {
  return (
    <Provider>
      <Counter />
    </Provider>
  );
}
```

### Step 3: Use the State and Dispatch in Your Components

```jsx
// Counter.tsx
import { useStateContext, useDispatchContext } from "./counter-context";

function Counter() {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  return (
    <div>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </div>
  );
}
```

---

## Advanced Usage: Combining Multiple Providers

### Method 1: Manual Nesting (Simple Apps)

```jsx
import { Provider as UserProvider } from "./user-context";
import { Provider as CartProvider } from "./cart-context";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <MainComponent />
      </CartProvider>
    </UserProvider>
  );
}
```

### Method 2: Combined Provider Utility (Scalable)

#### Create a utility file:

```jsx
// utils/combined-provider.tsx
import React, { FC, ReactElement } from "react";

type Provider = FC<{ children: ReactElement }>;

export const CombinedProvider = ({
  providers,
  children,
}: {
  providers: Provider[],
  children: ReactElement,
}) => (
  <>
    {providers.reduceRight(
      (acc, Provider) => (
        <Provider>{acc}</Provider>
      ),
      children
    )}
  </>
);
```

#### Use in your app:

```jsx
// App.tsx
import { CombinedProvider } from "./utils/combined-provider";
import { Provider as UserProvider } from "./user-context";
import { Provider as CartProvider } from "./cart-context";

function App() {
  return (
    <CombinedProvider providers={[UserProvider, CartProvider]}>
      <MainComponent />
    </CombinedProvider>
  );
}
```

## Benefits:

🚀 Isolated state management for different contexts

💡 No naming collisions between reducers

⚡ Optimized re-renders for each context

🔄 Easy to add/remove contexts

### Ideal Use Cases:

- Small to medium apps where global state is manageable without heavy tooling

- Projects already using Context but wanting to reduce re-renders

- Teams preferring React's native APIs over third-party solutions

### Contributing

Contributions are welcome! Please open an issue or PR on _[Github](https://github.com/arunjagadishsd/react-reducer-context/issues)_
