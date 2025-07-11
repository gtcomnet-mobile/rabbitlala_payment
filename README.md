# Rabbitlala Checkout SDK

A lightweight JavaScript SDK to embed Rabbitlala's payment checkout interface easily in your web applications.

---

## Installation

Install via npm:

```bash
npm install rabbitlala-checkout
```

## Usage
### Using npm (with bundlers like Webpack, Rollup, Vite)
Import the SDK and launch the payment iframe:

```bash
import launchRabbitlalaPayment from 'rabbitlala-checkout';
```
```bash
launchRabbitlalaPayment({
  reference: 'YOUR_PAYMENT_REFERENCE',
  isLiveMode: true // set to false for sandbox/testing mode
});
```


### Using CDN (direct script include)
```bash
<script src="https://unpkg.com/rabbitlala-checkout"></script>
```
```bash
<script>
  launchRabbitlalaPayment({
    reference: 'YOUR_PAYMENT_REFERENCE',
    isLiveMode: false
  });
</script>
```


## API
```
launchRabbitlalaPayment({ reference, isLiveMode = false })
```
  #### reference (string) — Unique payment reference ID. Required

  #### isLiveMode (boolean) — Set to true to use live environment, or false for sandbox. Default: false

This function creates an iframe overlay with the checkout page, showing a loader and backdrop automatically.
