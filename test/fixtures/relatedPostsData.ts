import type { Post } from '../../src/types';

export const poolOfPosts = [
	{
		title: 'Test One',
		category: 'technology',
		tags: ['programming', 'software', 'markdown', 'blog post'],
		slug: 'test-one'
	},
	{
		title: 'Test Two',
		category: 'cat',
		tags: ['tag'],
		slug: 'test-two'
	},
	{
		title: 'Test Three',
		category: 'something',
		tags: [],
		slug: 'test-three'
	},
	{
		title: 'Test Four',
		category: 'technology',
		tags: ['programming', 'code', 'testing', 'tags', 'sorting', 'querying'],
		slug: 'test-four'
	},
	{
		title: 'Test Five',
		category: 'c',
		tags: undefined,
		slug: 'test-five'
	},
	{
		title: 'A Hamburger',
		category: 'test3',
		tags: ['food', 'other'],
		slug: 'great-restaurants'
	},
	{
		title: 'Italics',
		category: 'technology',
		tags: ['tag'],
		slug: 'birch'
	},
	{
		title: 'The Test',
		category: 'another one',
		tags: ['test Two', 'again', 'tagging'],
		slug: 'test-i'
	},
	{
		title: 'Bold Test',
		category: 'tech',
		tags: ['programming', 'another', 'other'],
		slug: 'bold'
	}
] as Post[];

export const poolOfPostsFull: Post[] = [
	{
		title: 'Lorem Ipsum 3001',
		description: 'another post about HR Giger',
		coverImageUrl: '',
		coverImageAlt: 'another painting by HR Giger',
		datePublished: new Date('2021-12-30T00:00:00.000Z'),
		dateModified: new Date('2021-12-30T00:00:00.000Z'),
		category: 'minimalism',
		tags: ['sound'],
		body: '',
		internalContent: '',
		excerpt:
			"This is a post excerpt, used for testing with Cypress. We'll grab the text by searching for it on the DOM. This should be the final sentence…",
		timeToRead: 2,
		slug: '/lorem-ipsum-3001',
		route: '/lorem-ipsum-3001',
		pathName: '/lorem-ipsum-3001',
		url: 'https://zito.dev/lorem-ipsum-3001'
	},
	{
		title: 'Lorem Ipsum 3000',
		description: 'a post about HR Giger',
		coverImageUrl: '',
		coverImageAlt: 'a painting by HR Giger',
		datePublished: new Date('2021-12-29T00:00:00.000Z'),
		dateModified: new Date('2021-12-29T00:00:00.000Z'),
		category: 'technology',
		tags: ['programming', 'critical analysis'],
		body: '',
		internalContent: '',
		excerpt:
			"This is a TEST post excerpt, used for testing with Cypress. We'll grab the text by searching for it on the DOM. This should be the final…",
		timeToRead: 2,
		slug: '/lorem-ipsum-3000',
		route: '/lorem-ipsum-3000',
		pathName: '/lorem-ipsum-3000',
		url: 'https://zito.dev/lorem-ipsum-3000'
	},
	{
		title: 'Andrea Zittel 2',
		description: 'Another story about the art of Andrea Zittel',
		coverImageUrl: '',
		coverImageAlt: 'A sculpture by Andrea Zittel',
		datePublished: new Date('2021-11-24T00:00:00.000Z'),
		dateModified: new Date('2021-11-24T00:00:00.000Z'),
		category: 'minimalism',
		tags: ['sound'],
		body: '',
		internalContent: '',
		excerpt:
			'Table of Contents Headers Emphasis Lists Links Images Code and Syntax Highlighting Tables Blockquotes Inline HTML Horizontal Rule Line…',
		timeToRead: 2,
		slug: '/andrea-zittel-2',
		route: '/andrea-zittel-2',
		pathName: '/andrea-zittel-2',
		url: 'https://zito.dev/andrea-zittel-2'
	},
	{
		title: 'Andrea Zittel',
		description: 'A story about the art of Andrea Zittel',
		coverImageUrl: '',
		coverImageAlt: 'A sculpture by Andrea Zittel',
		datePublished: new Date('2021-11-22T00:00:00.000Z'),
		dateModified: new Date('2021-11-22T00:00:00.000Z'),
		category: 'technology',
		tags: ['programming', 'vinyl'],
		body: '',
		internalContent: '',
		excerpt:
			'Table of Contents Headers Emphasis Lists Links Images Code and Syntax Highlighting Tables Blockquotes Inline HTML Horizontal Rule Line…',
		timeToRead: 2,
		slug: '/andrea-zittel',
		route: '/andrea-zittel',
		pathName: '/andrea-zittel',
		url: 'https://zito.dev/andrea-zittel'
	},
	{
		title: 'Lorem Ipsum 33',
		description: 'this is yet another post description',
		coverImageUrl: '',
		coverImageAlt: 'Yet another image of the Goddess Kali',
		datePublished: new Date('2021-11-06T00:00:00.000Z'),
		dateModified: new Date('2021-11-09T00:00:00.000Z'),
		category: 'technology',
		tags: ['programming', 'critical analysis'],
		body: '',
		internalContent: '',
		excerpt:
			'Dillinger The Last Markdown Editor, Ever Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,\n' +
			'AngularJS-powered HTML…',
		timeToRead: 2,
		slug: '/lorem-ipsum-33',
		route: '/lorem-ipsum-33',
		pathName: '/lorem-ipsum-33',
		url: 'https://zito.dev/lorem-ipsum-33'
	},
	{
		title: 'Toulouse Lautrec',
		description: 'a story about Toulouse Lautrec',
		coverImageUrl: '',
		coverImageAlt: 'a painting by Toulouse Lautrec',
		datePublished: new Date('2021-11-02T00:00:00.000Z'),
		dateModified: new Date('2021-11-02T00:00:00.000Z'),
		category: 'technology',
		tags: ['programming', 'critical analysis'],
		body: '',
		internalContent: '',
		excerpt:
			'Dillinger The Last Markdown Editor, Ever Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,\n' +
			'AngularJS-powered HTML…',
		timeToRead: 2,
		slug: '/toulouse-lautrec',
		route: '/toulouse-lautrec',
		pathName: '/toulouse-lautrec',
		url: 'https://zito.dev/toulouse-lautrec'
	},
	{
		title: 'Francis Bacon',
		description: 'a post about Francis Bacon',
		coverImageUrl: '',
		coverImageAlt: 'a painting by Francis Bacon',
		datePublished: new Date('2021-05-04T00:00:00.000Z'),
		dateModified: new Date('2021-05-04T00:00:00.000Z'),
		category: 'art',
		tags: ['television analysis', 'programming'],
		body: '',
		internalContent: '',
		excerpt:
			'Table of Contents Headers Emphasis Lists Links Images Code and Syntax Highlighting Tables Blockquotes Inline HTML Horizontal Rule Line…',
		timeToRead: 2,
		slug: '/francis-bacon',
		route: '/francis-bacon',
		pathName: '/francis-bacon',
		url: 'https://zito.dev/francis-bacon'
	},
	{
		title: 'Exmagma 2',
		description: 'another story about Exmagma and Krautrock',
		coverImageUrl: '',
		coverImageAlt: 'A painting of the band Exmagma',
		datePublished: new Date('2021-03-14T00:00:00.000Z'),
		dateModified: new Date('2021-03-14T00:00:00.000Z'),
		category: 'minimalism',
		tags: ['sound'],
		body: '',
		internalContent: '',
		excerpt:
			'Table of Contents Headers Emphasis Lists Links Images Code and Syntax Highlighting Tables Blockquotes Inline HTML Horizontal Rule Line…',
		timeToRead: 2,
		slug: '/exmagma-2',
		route: '/exmagma-2',
		pathName: '/exmagma-2',
		url: 'https://zito.dev/exmagma-2'
	},
	{
		title: 'Exmagma',
		description: 'a story about Exmagma and Krautrock',
		coverImageUrl: '',
		coverImageAlt: 'A painting of the band Exmagma',
		datePublished: new Date('2021-03-12T00:00:00.000Z'),
		dateModified: new Date('2021-03-12T00:00:00.000Z'),
		category: 'technology',
		tags: ['television analysis', 'programming'],
		body: '',
		internalContent: '',
		excerpt:
			'Table of Contents Headers Emphasis Lists Links Images Code and Syntax Highlighting Tables Blockquotes Inline HTML Horizontal Rule Line…',
		timeToRead: 2,
		slug: '/exmagma',
		route: '/exmagma',
		pathName: '/exmagma',
		url: 'https://zito.dev/exmagma'
	},
	{
		title: 'Lorem Ipsum 2',
		description: 'this is another post description',
		coverImageUrl: '',
		coverImageAlt: 'Another image of the Goddess Kali',
		datePublished: new Date('2021-03-06T00:00:00.000Z'),
		dateModified: new Date('2021-03-09T00:00:00.000Z'),
		category: 'technology',
		tags: ['television analysis', 'critical analysis'],
		body: '',
		internalContent: '',
		excerpt:
			'Table of Contents Headers Emphasis Lists Links Images Code and Syntax Highlighting Tables Blockquotes Inline HTML Horizontal Rule Line…',
		timeToRead: 2,
		slug: '/lorem-ipsum-2',
		route: '/lorem-ipsum-2',
		pathName: '/lorem-ipsum-2',
		url: 'https://zito.dev/lorem-ipsum-2'
	},
	{
		title: 'Ida Applebroog',
		description: 'this is a story about the art of Ida Applebroog',
		coverImageUrl: '',
		coverImageAlt: 'A painting by Ida Applebroog',
		datePublished: new Date('2021-02-11T00:00:00.000Z'),
		dateModified: new Date('2021-02-11T00:00:00.000Z'),
		category: 'technology',
		tags: ['programming', 'software engineering'],
		body: '',
		internalContent: '',
		excerpt:
			'Dillinger The Last Markdown Editor, Ever Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,\n' +
			'AngularJS-powered HTML…',
		timeToRead: 2,
		slug: '/ida-applebroog',
		route: '/ida-applebroog',
		pathName: '/ida-applebroog',
		url: 'https://zito.dev/ida-applebroog'
	},
	{
		title: 'Elric of Melnibone',
		description: 'an item a title a description',
		coverImageUrl: '',
		coverImageAlt: 'An drawing by Paper Rad',
		datePublished: new Date('2021-01-17T00:00:00.000Z'),
		dateModified: new Date('2021-01-17T00:00:00.000Z'),
		category: 'technology',
		tags: ['javascript', 'programming'],
		body: '',
		internalContent: '',
		excerpt:
			'Table of Contents Headers Emphasis Lists Links Images Code and Syntax Highlighting Tables Blockquotes Inline HTML Horizontal Rule Line…',
		timeToRead: 2,
		slug: '/elric-of-melnibone',
		route: '/elric-of-melnibone',
		pathName: '/elric-of-melnibone',
		url: 'https://zito.dev/elric-of-melnibone'
	},
	{
		title: 'Lorem Capra',
		description: 'this is another a post description',
		coverImageUrl: '',
		coverImageAlt: 'An image of a sculpture by Matthew Barney',
		datePublished: new Date('2021-01-16T00:00:00.000Z'),
		dateModified: new Date('2021-01-16T00:00:00.000Z'),
		category: 'technology',
		tags: ['programming', 'music'],
		body: '',
		internalContent: '',
		excerpt:
			'Dillinger The Last Markdown Editor, Ever Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,\n' +
			'AngularJS-powered HTML…',
		timeToRead: 2,
		slug: '/lorem-capra',
		route: '/lorem-capra',
		pathName: '/lorem-capra',
		url: 'https://zito.dev/lorem-capra'
	},
	{
		title: 'My Favorite Soft Machine Records',
		description:
			'An exploration of the Canterbury Scene, as heard through the sound of the Soft Machine',
		coverImageUrl: '',
		coverImageAlt: 'An image of musician Robert Wyatt',
		datePublished: new Date('2021-01-07T00:00:00.000Z'),
		dateModified: new Date('2021-01-07T00:00:00.000Z'),
		category: 'music',
		tags: ['progrock', 'vinyl'],
		body: '',
		internalContent: '',
		excerpt:
			"This is another TEST post excerpt, used for testing with Cypress. We'll grab the text by searching for it on the DOM. This should be the…",
		timeToRead: 3,
		slug: '/my-favorite-soft-machine-records',
		route: '/my-favorite-soft-machine-records',
		pathName: '/my-favorite-soft-machine-records',
		url: 'https://zito.dev/my-favorite-soft-machine-records'
	},
	{
		title: 'Lorem Ipsum',
		description: 'this is a post description',
		coverImageUrl: '',
		coverImageAlt: 'An image of the Goddess Kali',
		datePublished: new Date('2021-01-06T00:00:00.000Z'),
		dateModified: new Date('2021-01-09T00:00:00.000Z'),
		category: 'technology',
		tags: ['programming', 'javascript', 'software engineering'],
		body: '',
		internalContent: '',
		excerpt:
			'Dillinger The Last Markdown Editor, Ever Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible, AngularJS-powered HTML…',
		timeToRead: 2,
		slug: '/lorem-ipsum',
		route: '/lorem-ipsum',
		pathName: '/lorem-ipsum',
		url: 'https://zito.dev/lorem-ipsum'
	}
];

export const edgeCaseTargetPost: Post = {
	title: 'Andrea Zittel',
	description: 'A story about the art of Andrea Zittel',
	coverImageUrl: '',
	coverImageAlt: 'A sculpture by Andrea Zittel',
	datePublished: new Date('2021-11-22T00:00:00.000Z'),
	dateModified: new Date('2021-11-22T00:00:00.000Z'),
	category: 'technology',
	tags: ['programming', 'vinyl'],
	body: '',
	internalContent: '',
	excerpt:
		'Table of Contents Headers Emphasis Lists Links Images Code and Syntax Highlighting Tables Blockquotes Inline HTML Horizontal Rule Line…',
	timeToRead: 2,
	slug: '/andrea-zittel',
	route: '/andrea-zittel',
	pathName: '/andrea-zittel',
	url: 'https://zito.dev/andrea-zittel'
};
