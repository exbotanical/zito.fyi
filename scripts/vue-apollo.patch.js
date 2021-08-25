#!/usr/bin/env node

/**
 * patch for @vue/apollo-composable until the maintainer is able
 * to update 'vue-demi' imports which break in vue 3 and newer versions of
 * the composition api
 */
const fs = require('fs');
const path = require('path');

fs.rmdirSync(path.resolve(__dirname, '../node_modules/.vite_opt_cache'), {
  recursive: true,
});

const useQueryPath = path.resolve(
  __dirname,
  '../node_modules/@vue/apollo-composable/dist/useQuery.js'
);

fs.writeFileSync(
  useQueryPath,
  fs
    .readFileSync(useQueryPath, 'utf8')
    .replace(/\/\/ @ts-expect-error.*[\r\n]+(onServerPrefetch),/m, '// $1,\n')
    .replace(/export function/m, '\n\rimport * as VueDemi from \'vue-demi\';\nconst onServerPrefetch = VueDemi.onServerPrefetch;\n\rexport function')
);
