import type { Post } from '@/types'

export const post: Post = {
  body: 'var _excluded = ["components"];\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\n/* @jsxRuntime classic */\n\n/* @jsx mdx */\nvar _frontmatter = {\n  "title": "Lorem Ipsum",\n  "cover": "images/kali-15.jpg",\n  "coverAlt": "An image of the Goddess Kali",\n  "description": "this is a post description",\n  "datePublished": "2021-01-06",\n  "dateModified": "2021-01-09",\n  "category": "technology",\n  "tags": ["programming", "javascript", "software engineering"]\n};\nvar layoutProps = {\n  _frontmatter: _frontmatter\n};\nvar MDXLayout = "wrapper";\nreturn function MDXContent(_ref) {\n  var components = _ref.components,\n      props = _objectWithoutProperties(_ref, _excluded);\n\n  return mdx(MDXLayout, _extends({}, layoutProps, props, {\n    components: components,\n    mdxType: "MDXLayout"\n  }), mdx("h1", null, "Dillinger"), mdx("h2", null, mdx("em", {\n    parentName: "h2"\n  }, "The Last Markdown Editor, Ever")), mdx("a", {\n    "href": "https://nodesource.com/products/nsolid",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, mdx("img", {\n    parentName: "a",\n    "src": "https://cldup.com/dTxpPi9lDf.thumb.png",\n    "alt": "N|Solid"\n  })), mdx("a", {\n    "href": "https://travis-ci.org/joemccann/dillinger",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, mdx("img", {\n    parentName: "a",\n    "src": "https://travis-ci.org/joemccann/dillinger.svg?branch=master",\n    "alt": "Build Status"\n  })), mdx("p", null, "Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible, AngularJS-powered HTML5 Markdown editor."), mdx("ul", null, mdx("li", {\n    parentName: "ul"\n  }, "Type some Markdown on the left"), mdx("li", {\n    parentName: "ul"\n  }, "See HTML in the right"), mdx("li", {\n    parentName: "ul"\n  }, mdx("span", {\n    parentName: "li",\n    "role": "img",\n    "aria-label": "sparkles"\n  }, "\\u2728"), "Magic ", mdx("span", {\n    parentName: "li",\n    "role": "img",\n    "aria-label": "sparkles"\n  }, "\\u2728"))), mdx("h2", null, "Features"), mdx("ul", null, mdx("li", {\n    parentName: "ul"\n  }, "Import a HTML file and watch it magically convert to Markdown"), mdx("li", {\n    parentName: "ul"\n  }, "Drag and drop images (requires your Dropbox account be linked)"), mdx("li", {\n    parentName: "ul"\n  }, "Import and save files from GitHub, Dropbox, Google Drive and One Drive"), mdx("li", {\n    parentName: "ul"\n  }, "Drag and drop markdown and HTML files into Dillinger"), mdx("li", {\n    parentName: "ul"\n  }, "Export documents as Markdown, HTML and PDF")), mdx("p", null, "Markdown is a lightweight markup language based on the formatting conventions\\nthat people naturally use in email.\\nAs ", mdx("a", {\n    parentName: "p",\n    "href": "http://daringfireball.net",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "John Gruber"), " writes on the ", mdx("a", {\n    parentName: "p",\n    "href": "http://daringfireball.net/projects/markdown/",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "Markdown site")), mdx("blockquote", null, mdx("p", {\n    parentName: "blockquote"\n  }, "The overriding design goal for Markdown\'s\\nformatting syntax is to make it as readable\\nas possible. The idea is that a\\nMarkdown-formatted document should be\\npublishable as-is, as plain text, without\\nlooking like it\'s been marked up with tags\\nor formatting instructions.")), mdx("p", null, "This text you see here is *actually- written in Markdown! To get a feel\\nfor Markdown\'s syntax, type some text into the left window and\\nwatch the results in the right."), mdx("h2", null, "Tech"), mdx("p", null, "Dillinger uses a number of open source projects to work properly:"), mdx("ul", null, mdx("li", {\n    parentName: "ul"\n  }, mdx("a", {\n    parentName: "li",\n    "href": "http://angularjs.org",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "AngularJS"), " - HTML enhanced for web apps!"), mdx("li", {\n    parentName: "ul"\n  }, mdx("a", {\n    parentName: "li",\n    "href": "http://ace.ajax.org",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "Ace Editor"), " - awesome web-based text editor"), mdx("li", {\n    parentName: "ul"\n  }, mdx("a", {\n    parentName: "li",\n    "href": "https://github.com/markdown-it/markdown-it",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "markdown-it"), " - Markdown parser done right. Fast and easy to extend."), mdx("li", {\n    parentName: "ul"\n  }, mdx("a", {\n    parentName: "li",\n    "href": "http://twitter.github.com/bootstrap/",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "Twitter Bootstrap"), " - great UI boilerplate for modern web apps"), mdx("li", {\n    parentName: "ul"\n  }, mdx("a", {\n    parentName: "li",\n    "href": "http://nodejs.org",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "node.js"), " - evented I/O for the backend"), mdx("li", {\n    parentName: "ul"\n  }, mdx("a", {\n    parentName: "li",\n    "href": "http://expressjs.com",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "Express"), " - fast node.js network app framework ", mdx("a", {\n    parentName: "li",\n    "href": "http://twitter.com/tjholowaychuk",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "@tjholowaychuk")), mdx("li", {\n    parentName: "ul"\n  }, mdx("a", {\n    parentName: "li",\n    "href": "http://gulpjs.com",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "Gulp"), " - the streaming build system"), mdx("li", {\n    parentName: "ul"\n  }, mdx("a", {\n    parentName: "li",\n    "href": "https://breakdance.github.io/breakdance/",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "Breakdance"), " - HTML\\nto Markdown converter"), mdx("li", {\n    parentName: "ul"\n  }, mdx("a", {\n    parentName: "li",\n    "href": "http://jquery.com",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "jQuery"), " - duh")), mdx("p", null, "And of course Dillinger itself is open source with a ", mdx("a", {\n    parentName: "p",\n    "href": "https://github.com/joemccann/dillinger",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "public repository"), "\\non GitHub."), mdx("h2", null, "Installation"), mdx("p", null, "Dillinger requires ", mdx("a", {\n    parentName: "p",\n    "href": "https://nodejs.org/",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "Node.js"), " v10+ to run."), mdx("p", null, "Install the dependencies and devDependencies and start the server."), mdx("div", {\n    "className": "gatsby-highlight",\n    "data-language": "sh"\n  }, mdx("pre", {\n    parentName: "div",\n    "style": {\n      "counterReset": "linenumber NaN"\n    },\n    "className": "language-sh line-numbers"\n  }, mdx("code", {\n    parentName: "pre",\n    "className": "language-sh"\n  }, "cd dillinger\\nnpm i\\nnode app"), mdx("span", {\n    parentName: "pre",\n    "aria-hidden": "true",\n    "className": "line-numbers-rows",\n    "style": {\n      "whiteSpace": "normal",\n      "width": "auto",\n      "left": "0"\n    }\n  }, mdx("span", {\n    parentName: "span"\n  }), mdx("span", {\n    parentName: "span"\n  }), mdx("span", {\n    parentName: "span"\n  })))), mdx("p", null, "For production environments..."), mdx("div", {\n    "className": "gatsby-highlight",\n    "data-language": "sh"\n  }, mdx("pre", {\n    parentName: "div",\n    "style": {\n      "counterReset": "linenumber NaN"\n    },\n    "className": "language-sh line-numbers"\n  }, mdx("code", {\n    parentName: "pre",\n    "className": "language-sh"\n  }, "npm install --production\\nNODE_ENV=production node app"), mdx("span", {\n    parentName: "pre",\n    "aria-hidden": "true",\n    "className": "line-numbers-rows",\n    "style": {\n      "whiteSpace": "normal",\n      "width": "auto",\n      "left": "0"\n    }\n  }, mdx("span", {\n    parentName: "span"\n  }), mdx("span", {\n    parentName: "span"\n  })))), mdx("h2", null, "Plugins"), mdx("p", null, "Dillinger is currently extended with the following plugins.\\nInstructions on how to use them in your own application are linked below."), mdx("table", null, mdx("thead", {\n    parentName: "table"\n  }, mdx("tr", {\n    parentName: "thead"\n  }, mdx("th", {\n    parentName: "tr",\n    "align": null\n  }, "Plugin"), mdx("th", {\n    parentName: "tr",\n    "align": null\n  }, "README"))), mdx("tbody", {\n    parentName: "table"\n  }, mdx("tr", {\n    parentName: "tbody"\n  }, mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, "Dropbox"), mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, mdx("a", {\n    parentName: "td",\n    "href": "https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "plugins/dropbox/README.md"))), mdx("tr", {\n    parentName: "tbody"\n  }, mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, "GitHub"), mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, mdx("a", {\n    parentName: "td",\n    "href": "https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "plugins/github/README.md"))), mdx("tr", {\n    parentName: "tbody"\n  }, mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, "Google Drive"), mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, mdx("a", {\n    parentName: "td",\n    "href": "https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "plugins/googledrive/README.md"))), mdx("tr", {\n    parentName: "tbody"\n  }, mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, "OneDrive"), mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, mdx("a", {\n    parentName: "td",\n    "href": "https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "plugins/onedrive/README.md"))), mdx("tr", {\n    parentName: "tbody"\n  }, mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, "Medium"), mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, mdx("a", {\n    parentName: "td",\n    "href": "https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "plugins/medium/README.md"))), mdx("tr", {\n    parentName: "tbody"\n  }, mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, "Google Analytics"), mdx("td", {\n    parentName: "tr",\n    "align": null\n  }, mdx("a", {\n    parentName: "td",\n    "href": "https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md",\n    "target": "_blank",\n    "rel": "nofollow noopener noreferrer"\n  }, "plugins/googleanalytics/README.md"))))), mdx("h2", null, "Development"), mdx("p", null, "Want to contribute? Great!"), mdx("p", null, "Dillinger uses Gulp + Webpack for fast developing.\\nMake a change in your file and instantaneously see your updates!"), mdx("p", null, "Open your favorite Terminal and run these commands."), mdx("p", null, "First Tab:"), mdx("div", {\n    "className": "gatsby-highlight",\n    "data-language": "sh"\n  }, mdx("pre", {\n    parentName: "div",\n    "style": {\n      "counterReset": "linenumber NaN"\n    },\n    "className": "language-sh line-numbers"\n  }, mdx("code", {\n    parentName: "pre",\n    "className": "language-sh"\n  }, "node app"), mdx("span", {\n    parentName: "pre",\n    "aria-hidden": "true",\n    "className": "line-numbers-rows",\n    "style": {\n      "whiteSpace": "normal",\n      "width": "auto",\n      "left": "0"\n    }\n  }, mdx("span", {\n    parentName: "span"\n  })))), mdx("p", null, "Second Tab:"), mdx("div", {\n    "className": "gatsby-highlight",\n    "data-language": "sh"\n  }, mdx("pre", {\n    parentName: "div",\n    "style": {\n      "counterReset": "linenumber NaN"\n    },\n    "className": "language-sh line-numbers"\n  }, mdx("code", {\n    parentName: "pre",\n    "className": "language-sh"\n  }, "gulp watch"), mdx("span", {\n    parentName: "pre",\n    "aria-hidden": "true",\n    "className": "line-numbers-rows",\n    "style": {\n      "whiteSpace": "normal",\n      "width": "auto",\n      "left": "0"\n    }\n  }, mdx("span", {\n    parentName: "span"\n  })))), mdx("p", null, "(optional) Third:"), mdx("div", {\n    "className": "gatsby-highlight",\n    "data-language": "sh"\n  }, mdx("pre", {\n    parentName: "div",\n    "style": {\n      "counterReset": "linenumber NaN"\n    },\n    "className": "language-sh line-numbers"\n  }, mdx("code", {\n    parentName: "pre",\n    "className": "language-sh"\n  }, "karma test"), mdx("span", {\n    parentName: "pre",\n    "aria-hidden": "true",\n    "className": "line-numbers-rows",\n    "style": {\n      "whiteSpace": "normal",\n      "width": "auto",\n      "left": "0"\n    }\n  }, mdx("span", {\n    parentName: "span"\n  })))), mdx("h4", null, "Building for source"), mdx("p", null, "For production release:"), mdx("div", {\n    "className": "gatsby-highlight",\n    "data-language": "sh"\n  }, mdx("pre", {\n    parentName: "div",\n    "style": {\n      "counterReset": "linenumber NaN"\n    },\n    "className": "language-sh line-numbers"\n  }, mdx("code", {\n    parentName: "pre",\n    "className": "language-sh"\n  }, "gulp build --prod"), mdx("span", {\n    parentName: "pre",\n    "aria-hidden": "true",\n    "className": "line-numbers-rows",\n    "style": {\n      "whiteSpace": "normal",\n      "width": "auto",\n      "left": "0"\n    }\n  }, mdx("span", {\n    parentName: "span"\n  })))), mdx("p", null, "Generating pre-built zip archives for distribution:"), mdx("div", {\n    "className": "gatsby-highlight",\n    "data-language": "sh"\n  }, mdx("pre", {\n    parentName: "div",\n    "style": {\n      "counterReset": "linenumber NaN"\n    },\n    "className": "language-sh line-numbers"\n  }, mdx("code", {\n    parentName: "pre",\n    "className": "language-sh"\n  }, "gulp build dist --prod"), mdx("span", {\n    parentName: "pre",\n    "aria-hidden": "true",\n    "className": "line-numbers-rows",\n    "style": {\n      "whiteSpace": "normal",\n      "width": "auto",\n      "left": "0"\n    }\n  }, mdx("span", {\n    parentName: "span"\n  })))), mdx("h2", null, "Docker"), mdx("p", null, "Dillinger is very easy to install and deploy in a Docker container."), mdx("p", null, "By default, the Docker will expose port 8080, so change this within the\\nDockerfile if necessary. When ready, simply use the Dockerfile to\\nbuild the image."), mdx("div", {\n    "className": "gatsby-highlight",\n    "data-language": "sh"\n  }, mdx("pre", {\n    parentName: "div",\n    "style": {\n      "counterReset": "linenumber NaN"\n    },\n    "className": "language-sh line-numbers"\n  }, mdx("code", {\n    parentName: "pre",\n    "className": "language-sh"\n  }, "cd dillinger\\ndocker build -t <youruser>/dillinger:${package.json.version} ."), mdx("span", {\n    parentName: "pre",\n    "aria-hidden": "true",\n    "className": "line-numbers-rows",\n    "style": {\n      "whiteSpace": "normal",\n      "width": "auto",\n      "left": "0"\n    }\n  }, mdx("span", {\n    parentName: "span"\n  }), mdx("span", {\n    parentName: "span"\n  })))), mdx("p", null, "This will create the dillinger image and pull in the necessary dependencies.\\nBe sure to swap out ", mdx("code", {\n    parentName: "p",\n    "className": "language-text"\n  }, "${package.json.version}"), " with the actual\\nversion of Dillinger."), mdx("p", null, "Once done, run the Docker image and map the port to whatever you wish on\\nyour host. In this example, we simply map port 8000 of the host to\\nport 8080 of the Docker (or whatever port was exposed in the Dockerfile):"), mdx("div", {\n    "className": "gatsby-highlight",\n    "data-language": "sh"\n  }, mdx("pre", {\n    parentName: "div",\n    "style": {\n      "counterReset": "linenumber NaN"\n    },\n    "className": "language-sh line-numbers"\n  }, mdx("code", {\n    parentName: "pre",\n    "className": "language-sh"\n  }, "docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=dillinger <youruser>/dillinger:${package.json.version}"), mdx("span", {\n    parentName: "pre",\n    "aria-hidden": "true",\n    "className": "line-numbers-rows",\n    "style": {\n      "whiteSpace": "normal",\n      "width": "auto",\n      "left": "0"\n    }\n  }, mdx("span", {\n    parentName: "span"\n  })))), mdx("blockquote", null, mdx("p", {\n    parentName: "blockquote"\n  }, "Note: ", mdx("code", {\n    parentName: "p",\n    "className": "language-text"\n  }, "--capt-add=SYS-ADMIN"), " is required for PDF rendering.")), mdx("p", null, "Verify the deployment by navigating to your server address in\\nyour preferred browser."), mdx("div", {\n    "className": "gatsby-highlight",\n    "data-language": "sh"\n  }, mdx("pre", {\n    parentName: "div",\n    "style": {\n      "counterReset": "linenumber NaN"\n    },\n    "className": "language-sh line-numbers"\n  }, mdx("code", {\n    parentName: "pre",\n    "className": "language-sh"\n  }, "127.0.0.1:8000"), mdx("span", {\n    parentName: "pre",\n    "aria-hidden": "true",\n    "className": "line-numbers-rows",\n    "style": {\n      "whiteSpace": "normal",\n      "width": "auto",\n      "left": "0"\n    }\n  }, mdx("span", {\n    parentName: "span"\n  })))), mdx("h2", null, "License"), mdx("p", null, "MIT"), mdx("p", null, mdx("strong", {\n    parentName: "p"\n  }, "Free Software, Hell Yeah!")));\n}\n;\nMDXContent.isMDXComponent = true;',
  timeToRead: '3 min read',
  title: 'Lorem Ipsum',
  description: 'this is a post description',
  coverImg: {
    layout: 'constrained',
    placeholder: {
      fallback:
        'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAdABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMEAgX/xAAXAQADAQAAAAAAAAAAAAAAAAABAgME/9oADAMBAAIQAxAAAAFFSnCiDQuqS7mupCUpA3//xAAcEAEAAgMAAwAAAAAAAAAAAAABAAIDEBESISL/2gAIAQEAAQUCpjbRxDPo1f1Lh5YLMupVsurdZzh//8QAHBEAAgEFAQAAAAAAAAAAAAAAAAECERITIVFh/9oACAEDAQE/AZTpIT9Meyx9P//EABkRAAMAAwAAAAAAAAAAAAAAAAABEQISQf/aAAgBAgEBPwFYtqlNuFP/xAAfEAACAQQCAwAAAAAAAAAAAAAAARECISIyEDFRYXH/2gAIAQEABj8Cl2XgxxNRJKfhKog2SOz0XJL1cf/EABsQAQADAQEBAQAAAAAAAAAAAAEAESExQVFx/9oACAEBAAE/IW+FBN68lYNk9IDvH5i4EiaPfPyIso+MfvQ5cEHLXVx23sDaNMGSOQoT/9oADAMBAAIAAwAAABCX/n3/xAAYEQEBAQEBAAAAAAAAAAAAAAABEQAhsf/aAAgBAwEBPxB43JDFpvbhi+N//8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERUf/aAAgBAgEBPxCAMQUKCcP/xAAcEAEAAwEAAwEAAAAAAAAAAAABABEhMVFhoUH/2gAIAQEAAT8Qau/gJb5vxL54GONcuAL+RoR+y45i+geJQIyylhej1ePcjJUPZEQUOFPK0+xv0NmqtZzmzXw45E3uWQTHBGgghOJf2f/Z',
    },
    backgroundColor: 'transparent',
    images: {
      fallback: {
        src: '/static/14130c6514447b1b4119fa9d43d12bdb/81b7c/kali-15.jpg',
        srcSet:
          '/static/14130c6514447b1b4119fa9d43d12bdb/714de/kali-15.jpg 63w,\n/static/14130c6514447b1b4119fa9d43d12bdb/67156/kali-15.jpg 127w,\n/static/14130c6514447b1b4119fa9d43d12bdb/81b7c/kali-15.jpg 253w,\n/static/14130c6514447b1b4119fa9d43d12bdb/2be7d/kali-15.jpg 506w',
        sizes: '(min-width: 253px) 253px, 100vw',
      },
      sources: [
        {
          srcSet:
            '/static/14130c6514447b1b4119fa9d43d12bdb/a74e4/kali-15.avif 63w,\n/static/14130c6514447b1b4119fa9d43d12bdb/8e2c5/kali-15.avif 127w,\n/static/14130c6514447b1b4119fa9d43d12bdb/f0967/kali-15.avif 253w,\n/static/14130c6514447b1b4119fa9d43d12bdb/5aef2/kali-15.avif 506w',
          type: 'image/avif',
          sizes: '(min-width: 253px) 253px, 100vw',
        },
        {
          srcSet:
            '/static/14130c6514447b1b4119fa9d43d12bdb/66664/kali-15.webp 63w,\n/static/14130c6514447b1b4119fa9d43d12bdb/2139e/kali-15.webp 127w,\n/static/14130c6514447b1b4119fa9d43d12bdb/529a1/kali-15.webp 253w,\n/static/14130c6514447b1b4119fa9d43d12bdb/5b7a8/kali-15.webp 506w',
          type: 'image/webp',
          sizes: '(min-width: 253px) 253px, 100vw',
        },
      ],
    },
    width: 253,
    height: 369,
  },
  coverImageUrl: '5.jpg',
  coverImageAlt: 'CoverImageAlt',
  datePublished: new Date('2021-01-06'),
  dateModified: new Date('2021-01-09'),
  category: 'technology',
  tags: ['programming', 'javascript'],

  slug: '/lorem-ipsum',
  route: '/lorem-ipsum',
  pathName: '/lorem-ipsum',
  url: 'https://zito.fyi/lorem-ipsum',

  internalContent:
    '---\ntitle: "Lorem Ipsum"\ncover: images/kali-15.jpg\ncoverAlt: "An image of the Goddess Kali"\ndescription: "this is a post description"\ndatePublished: "2021-01-06"\ndateModified: "2021-01-09"\ncategory: "technology"\ntags:\n  - programming\n  - javascript\n  - software engineering\n---\n\n# Dillinger\n## _The Last Markdown Editor, Ever_\n\n[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)\n\n[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)\n\nDillinger is a cloud-enabled, mobile-ready, offline-storage compatible, AngularJS-powered HTML5 Markdown editor.\n\n- Type some Markdown on the left\n- See HTML in the right\n- ✨Magic ✨\n\n## Features\n\n- Import a HTML file and watch it magically convert to Markdown\n- Drag and drop images (requires your Dropbox account be linked)\n- Import and save files from GitHub, Dropbox, Google Drive and One Drive\n- Drag and drop markdown and HTML files into Dillinger\n- Export documents as Markdown, HTML and PDF\n\nMarkdown is a lightweight markup language based on the formatting conventions\nthat people naturally use in email.\nAs [John Gruber] writes on the [Markdown site][df1]\n\n> The overriding design goal for Markdown\'s\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it\'s been marked up with tags\n> or formatting instructions.\n\nThis text you see here is *actually- written in Markdown! To get a feel\nfor Markdown\'s syntax, type some text into the left window and\nwatch the results in the right.\n\n## Tech\n\nDillinger uses a number of open source projects to work properly:\n\n- [AngularJS] - HTML enhanced for web apps!\n- [Ace Editor] - awesome web-based text editor\n- [markdown-it] - Markdown parser done right. Fast and easy to extend.\n- [Twitter Bootstrap] - great UI boilerplate for modern web apps\n- [node.js] - evented I/O for the backend\n- [Express] - fast node.js network app framework [@tjholowaychuk]\n- [Gulp] - the streaming build system\n- [Breakdance](https://breakdance.github.io/breakdance/) - HTML\nto Markdown converter\n- [jQuery] - duh\n\nAnd of course Dillinger itself is open source with a [public repository][dill]\n on GitHub.\n\n## Installation\n\nDillinger requires [Node.js](https://nodejs.org/) v10+ to run.\n\nInstall the dependencies and devDependencies and start the server.\n\n```sh\ncd dillinger\nnpm i\nnode app\n```\n\nFor production environments...\n\n```sh\nnpm install --production\nNODE_ENV=production node app\n```\n\n## Plugins\n\nDillinger is currently extended with the following plugins.\nInstructions on how to use them in your own application are linked below.\n\n| Plugin | README |\n| ------ | ------ |\n| Dropbox | [plugins/dropbox/README.md][PlDb] |\n| GitHub | [plugins/github/README.md][PlGh] |\n| Google Drive | [plugins/googledrive/README.md][PlGd] |\n| OneDrive | [plugins/onedrive/README.md][PlOd] |\n| Medium | [plugins/medium/README.md][PlMe] |\n| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |\n\n## Development\n\nWant to contribute? Great!\n\nDillinger uses Gulp + Webpack for fast developing.\nMake a change in your file and instantaneously see your updates!\n\nOpen your favorite Terminal and run these commands.\n\nFirst Tab:\n\n```sh\nnode app\n```\n\nSecond Tab:\n\n```sh\ngulp watch\n```\n\n(optional) Third:\n\n```sh\nkarma test\n```\n\n#### Building for source\n\nFor production release:\n\n```sh\ngulp build --prod\n```\n\nGenerating pre-built zip archives for distribution:\n\n```sh\ngulp build dist --prod\n```\n\n## Docker\n\nDillinger is very easy to install and deploy in a Docker container.\n\nBy default, the Docker will expose port 8080, so change this within the\nDockerfile if necessary. When ready, simply use the Dockerfile to\nbuild the image.\n\n```sh\ncd dillinger\ndocker build -t <youruser>/dillinger:${package.json.version} .\n```\n\nThis will create the dillinger image and pull in the necessary dependencies.\nBe sure to swap out `${package.json.version}` with the actual\nversion of Dillinger.\n\nOnce done, run the Docker image and map the port to whatever you wish on\nyour host. In this example, we simply map port 8000 of the host to\nport 8080 of the Docker (or whatever port was exposed in the Dockerfile):\n\n```sh\ndocker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=dillinger <youruser>/dillinger:${package.json.version}\n```\n\n> Note: `--capt-add=SYS-ADMIN` is required for PDF rendering.\n\nVerify the deployment by navigating to your server address in\nyour preferred browser.\n\n```sh\n127.0.0.1:8000\n```\n\n## License\n\nMIT\n\n**Free Software, Hell Yeah!**\n\n[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn\'t be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)\n\n  [dill]: <https://github.com/joemccann/dillinger>\n  [git-repo-url]: <https://github.com/joemccann/dillinger.git>\n  [john gruber]: <http://daringfireball.net>\n  [df1]: <http://daringfireball.net/projects/markdown/>\n  [markdown-it]: <https://github.com/markdown-it/markdown-it>\n  [Ace Editor]: <http://ace.ajax.org>\n  [node.js]: <http://nodejs.org>\n  [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>\n  [jQuery]: <http://jquery.com>\n  [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>\n  [express]: <http://expressjs.com>\n  [AngularJS]: <http://angularjs.org>\n  [Gulp]: <http://gulpjs.com>\n\n  [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>\n  [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>\n  [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>\n  [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>\n  [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>\n  [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>\n',
}
