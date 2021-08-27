import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

import { faShareAltSquare } from '@fortawesome/free-solid-svg-icons/faShareAltSquare';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons/faFingerprint';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';

export default function () {
	library.add(
		faInstagram,
		faYoutube,
		faGithub,
		faFacebook,
		faLinkedin,
		faTwitter,
		faShareAltSquare,
		faShareAlt,
		faFingerprint,
		faKey,
		faCommentAlt
	);

	return FontAwesomeIcon;
}
