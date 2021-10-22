import React from 'react';
import 'prism-themes/themes/prism-dracula.css';
import 'prismjs/plugins/command-line/prism-command-line.css';

import { QueryWrapper } from './src/context/QueryWrapper';

export const wrapRootElement = QueryWrapper;

export const onRenderBody = ({ setPostBodyComponents }) => {
	setPostBodyComponents([
		<script
			key="z-theme"
			dangerouslySetInnerHTML={{
				__html: `
				(function() {
					try {
						var mode = localStorage.getItem('theme');
						var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
						if (!mode && supportDarkMode) document.body.classList.add('theme-dark');
						if (!mode) return;
  					document.body.classList.add('theme-' + mode);
					} catch (e) {}
				})();
				`
			}}
		/>
	]);
};
