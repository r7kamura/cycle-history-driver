import { Rx } from '@cycle/core'

const historyRecord$ = new Rx.Subject();
window.onpopstate = (event) => {
  historyRecord$.onNext(event);
};

export function makeHistoryDriver() {
  return (history$) => {
    history$.subscribe(({ state = {}, title = '', url }) => {
      window.history.pushState(state, title, url);
    });
    return historyRecord$;
  };
}
