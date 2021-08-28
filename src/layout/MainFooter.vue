<script setup>
import {
	useGetters,
	useActions,
	useClipboard,
} from '@/hooks';

/* Components */
import Svg from "@/components/fragments/Svg.vue";

/* Data */
const { copy, isCopied } = useClipboard();

const fingerprint = 'C899 B092 077E 2A65 C37B B2F7 63E8 AA50 86D4 7BE0';

const { appAuthor } =
	useGetters('config', [
		'appAuthor'
	]);

const socials = [
	{ name: 'email', url: 'mailto:exbotanical@protonmail.com' },
	{ name: 'github', url: 'https://github.com/MatthewZito' }
];

/* Methods */
const { addNotification } =
  useActions('notifications', [
  	'addNotification'
  ]);


function onClickCopy ({ target } = {}) {
	copy(fingerprint)
		.then(ok => {
			if (ok) {
				addNotification({
					type: 'success',
					message: 'Successfully copied to clipboard'
				});
			}
		});
}
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
footer
	div.social-icons
	a(
	v-for="({ name, url }, idx) in socials"
	:key="idx"
	:href="url"
	target="_blank"
	)
	Svg(
	:name="name"
	color="#ff79c6"
	)
	span.social-links
	h6 &#169; {{ appAuthor }} |&nbsp;
	a(
	@dblclick="onClickCopy"
	tooltip="Double click to copy"
	flow="up"
	)
	h6 Fingerprint
	h6 &nbsp;|&nbsp;
	a(
	href="/pub.asc"
	download
	)
	h6 Public Key
</template>
