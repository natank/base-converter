# Basecraft

**basecraft** is a lightweight, efficient, and intuitive library for converting numbers between different bases. Whether you're dealing with binary, decimal, hexadecimal, or custom bases, `basecraft` makes it easy.

---

## Features

- 🧮 **Flexible Base Support**: Convert numbers between any base (2-36).
- ⚡ **Fast and Lightweight**: Minimal dependencies for maximum performance.
- 📦 **Custom Base Alphabets**: Define your own character sets for unique base systems.
- 🛠️ **Developer-Friendly API**: Simple and clear methods for base conversions.

---

## Installation

Install `basecraft` using npm:

```bash
npm install basecraft
```
or with yarn:
```bash
yarn add basecraft
```
##Usage
Import the Package
```bash
const basecraft = require('basecraft');

// ES Module import
// import basecraft from 'basecraft';
```
```bash
const decimal = basecraft.convert('1010', 2, 10);
console.log(decimal); // Output: 10
```
```bash
const hex = basecraft.convert('255', 10, 16);
console.log(hex); // Output: ff
```
