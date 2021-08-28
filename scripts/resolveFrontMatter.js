const { join, resolve } = require('path');
const fs = require('fs');

const matter = require('gray-matter');

const lookBehind = /(?<=\/blog\/).*$/;
const frontmatter = /---(.|\n)*?---/;
const matcher = _ => _.match(lookBehind);

export function extractor (rte) {
  const filePath = join(resolve(__dirname, '../'), rte);

  try {
    const raw = fs.readFileSync(filePath)
      .toString()
      .match(frontmatter)
      [0];

    const { data } = matter(raw);
    return data;
  } catch ({ message }) {
    console.log(message);
    return {};
  }
}
