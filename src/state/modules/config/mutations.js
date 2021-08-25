import initState, { cacheState } from './state';

export const addViewToCache = (state, view) => {
  if (state.cachedViews.includes(view?.name)) return;
  if (view?.meta?.cache) {
    state.cachedViews.push(view.name);
  }
};

export const removeViewFromCache = (state, view) => {
  const idx = state.cachedViews.indexOf(view.name);
  idx > -1 && state.cachedViews.splice(idx, 1);
};

export const resetViewCache = state => {
  Object.assign(state, cacheState());
};

export const resetState = state => {
  Object.assign(state, initState());
};
