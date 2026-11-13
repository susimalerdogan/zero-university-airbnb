# Kyoto Weekend Planner

A responsive trip-planning chatbot built with Next.js, TypeScript, Tailwind CSS 4 and daisyUI 5. The interface turns a Kyoto weekend request into three distinct recommendation cards while exposing clear loading, success and retry states.

![Kyoto Weekend Planner interface](./public/kyoto-trip-planner.png)

## Features

- Message input and send action lock while the assistant is thinking.
- Accessible thinking animation with `aria-busy` and a live status message.
- Three workbook-driven cards in a fixed order:
  - Stay: Machiya townhouse near Gion
  - Experience: Arashiyama Bamboo & Tea Walk
  - Food: Nishiki Market Kaiseki Bar
- Responsive card layouts that mirror the supplied design specification.
- Forced one-time failure flow with a working retry action.
- Reduced-motion support, semantic controls and labelled icon actions.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), enter `Plan a weekend in Kyoto for two`, and send the message.

## Test the error state

1. Open [http://localhost:3000/?fail=once](http://localhost:3000/?fail=once).
2. Send `Plan a weekend in Kyoto for two`.
3. Wait for the error bubble.
4. Select **Try again** to load the three cards.

## Validation

```bash
npm run build
npm run screenshot
```

The screenshot command launches the installed Google Chrome browser in headless mode and refreshes `public/kyoto-trip-planner.png` from the successful chat state.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS 4
- daisyUI 5
- Lucide React icons

