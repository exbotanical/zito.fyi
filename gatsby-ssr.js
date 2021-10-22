import React from 'react';
import 'prism-themes/themes/prism-dracula.css';
import 'prismjs/plugins/command-line/prism-command-line.css';

import { QueryWrapper } from './src/context/QueryWrapper';

export const wrapRootElement = QueryWrapper;

// var supportDarkMode =
// 	window.matchMedia('(prefers-color-scheme: dark)').matches === true;
// if (!mode && supportDarkMode) document.body.classList.add('theme-dark');
// if (!mode) return;

/**
 * Setting up the theme here ensures we don't experience any 'flashing' behaviors given
 * the following script will be invoked prior to React's lifecycle
 *
 * @todo use theme key
 */
export const onRenderBody = ({ setPostBodyComponents }) => {
	setPostBodyComponents([
		<script
			key="site_theme"
			dangerouslySetInnerHTML={{
				__html: `
				(function() {
					try {
						var mode = localStorage.getItem('theme');
  					document.body.classList.add(mode ? 'theme-' + mode : 'theme-light');
					} catch (e) {}
				})();
				`
			}}
		/>
	]);
};
