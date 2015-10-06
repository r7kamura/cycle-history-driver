# cycle-history-driver
A Cycle.js Driver to manage the browser history.

## Install
```sh
npm install @r7kamura/cycle-history-driver
```

## Usage
```js
import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom'
import { makeHistoryDriver } from '@r7kamura/cycle-history-driver';

Cycle.run(
  ({ DOM, history }) => view(model(intent({ DOM, history }))),
  {
    DOM: makeDOMDriver('body'),
    history: makeHistoryDriver()
  }
);
```

### request to push state
```js
// In your view function, you need to prepare an Observable that emits Object{url} for push-state.
// This Observable must be returned from your main function.
const historyRecord$ = DOM.select('a.your-internal-anchor').events('click').map((event) => {
  event.preventDefault();
  return { url: event.target.href };
});
```

### response from pop state
```js
// In your intent function, you can subscribe history to react to pop-state events.
// This Observable can be accessed from your main function's arguments.
history.map(_ => window.location.href).map((url) => { /* ... */ });
```
