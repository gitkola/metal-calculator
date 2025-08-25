# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a metal calculator application for calculating weight, volume, and cost of square metal bars. Built with Bun, React 19, TypeScript, Tailwind CSS, and shadcn/ui components. The UI is in Ukrainian.

## Development Commands

- `bun dev` - Start development server with hot reloading (runs `bun --hot src/index.tsx`)
- `bun start` - Run production server (with NODE_ENV=production)
- `bun build` - Build for production using custom build script (outputs to `dist/` with detailed file size reporting)
- `bun install` - Install dependencies

## Architecture

### Core Components
- `SquareMetalCalculator` - Main calculator UI component (src/components/square-metal-calculator.tsx:12)
- `useMetalCalculations` - Complex calculation hook with real-time recalculation logic (src/hooks/useMetalCalculations.ts:7)
- Calculator field components:
  - `CalculatorDropdownField` - For metal type selection
  - `CalculatorDecimalField` - For numeric inputs
  - `CalculatorCheckboxField` - For boolean toggles

### Data Flow & Calculations
The app uses a sophisticated calculation system in `useMetalCalculations` where changing any field triggers automatic recalculation of dependent fields:

- **Metal type + side dimensions** → weight per meter (using density from src/lib/types.ts:6)
- **Unit length + quantity** ↔ total length (bidirectional)
- **Total length + weight per meter** → total weight
- **Total weight + price per kg** → total cost
- **Cross-section area and volume** calculations based on dimensions

Key calculation logic in `useMetalCalculations.ts:23-81`:
- Switch-based recalculation depending on which field was changed
- Handles bidirectional relationships (e.g., totalLength ↔ quantity × unitLength)
- Real-time updates without debouncing (immediate state updates)

### State Management
- Single `CalculatorState` interface (src/lib/types.ts:15) manages all form fields
- Fields can be either `string` (for display/editing) or `number` (for calculations)
- `updateField` function handles type conversion and triggers recalculation

### Supported Metals
6 metal types with densities in г/см³ (src/lib/types.ts:6-13):
- Сталь (Steel): 7.87
- Нержавійка (Stainless Steel): 7.95  
- Алюміній (Aluminum): 2.7
- Мідь (Copper): 8.96
- Латунь (Brass): 8.5
- Титан (Titanium): 4.5

## Technology Stack

- **Runtime**: Bun (instead of Node.js)
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build**: Custom Bun build script (build.ts) with Tailwind plugin
- **State**: React hooks (no external state management)
