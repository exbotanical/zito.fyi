import pkg from '@pkg';

const { appName, author } = pkg;

export default () => ({
  ...cacheState(),
  appName,
  author
});

export function cacheState () {
  return {
    cachedViews: []
  };
}
