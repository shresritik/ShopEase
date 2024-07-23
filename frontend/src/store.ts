// export function createStore(initialState, reducer) {
//   const store = {
//     state: initialState,
//     listeners: [],
//   };
//   const dispatch = function (action, data) {
//     store.state=reducer({ type: action, data }, store.state);
//   };
//   const subscribe = function (cb) {
//     store.listeners.push(cb);
//   };
//   return { dispatch, subscribe };
// }
// function reducer(action, state) {
//   if (action.type === "ADD") {
//     return [...state, action.data];
//   }
// }
// const store = createStore({}, reducer);
// function reducer(action, state) {}
