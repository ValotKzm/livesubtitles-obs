// Textes repris du README du plugin. L'anglais sert de référence : `Dictionary`
// en est déduit, et une clé absente de `fr.ts` fait échouer `pnpm check`.
export const en = {
	meta: {
		title: 'LiveSubtitles: live subtitles for OBS Studio',
		description:
			'A free OBS Studio plugin that shows subtitles of what you say, live, translated or not. It runs entirely on your computer and needs no account, API key or server.'
	},
	nav: {
		skip: 'Skip to content',
		language: 'Language',
		source: 'Source code',
		theme: 'Switch between light and dark theme'
	},
	hero: {
		title: 'Live subtitles for your stream, translated or not',
		lead: 'LiveSubtitles is an OBS Studio plugin that shows subtitles of what you say, live, on your stream. Reach viewers who speak another language, or make your stream accessible to deaf and hard-of-hearing viewers.',
		download: 'Download for Windows',
		downloadNote: 'Free. Windows 10 or 11, OBS Studio 31.1 or later.',
		example: {
			spokenLabel: 'You say',
			spoken: 'Bonjour à tous, bienvenue sur le stream !',
			subtitleLabel: 'Your viewers read',
			subtitle: 'Hello everyone, welcome to the stream!'
		}
	},
	demo: {
		title: 'See it in action',
		alt: "Animated illustration: a cartoon streamer plays a shooter game and speaks French. A second or two after each sentence, the English subtitle appears at the bottom of the picture, then fades out: “Hi everyone, welcome to the stream!”, “Watch out, there's one behind the crate!”, “Not bad, let's move on to the next level.”",
		caption:
			'You speak into your microphone. A second or two after each sentence, the subtitle appears on your stream, then fades out by itself.',
		note: 'Drawn illustration, not a real capture. The speech bubble shows what the streamer says; only the subtitle at the bottom comes from LiveSubtitles.',
		simulator: {
			title: 'Try the simulator',
			settings: 'Simulator settings',
			spokenLabel: 'Spoken language',
			subtitleLabel: 'Subtitle language',
			languages: { fr: 'French', en: 'English' },
			play: 'Play',
			pause: 'Pause',
			youSay: 'You say',
			onStream: 'On your stream',
			statusSpeaking: 'You are speaking…',
			statusWaiting: 'End of the sentence: the subtitle arrives in a second or two.',
			statusShown: 'The subtitle is on screen, then fades out by itself.',
			sameLanguage: 'Same language on both sides: subtitles without translation.',
			disclaimer:
				'This is a simulation with prepared sentences: it does not use your microphone and translates nothing. The real translation is good for everyday speech, not perfect.',
			noscript: 'The simulator needs JavaScript. The rest of the page works without it.'
		}
	},
	arguments: {
		title: 'Why LiveSubtitles',
		items: [
			{
				title: 'Free',
				text: 'No subscription and no usage limit. LiveSubtitles is free software under the GNU General Public License.'
			},
			{
				title: 'Everything stays on your computer',
				text: 'Your voice never leaves your computer and nothing is recorded. Once installed, the plugin works without an internet connection.'
			},
			{
				title: 'No account, no API key',
				text: 'There is nothing to sign up for and no server to set up: one installer, one source to add in OBS, three settings.'
			}
		]
	},
	install: {
		title: 'Install in three steps',
		steps: [
			{ title: 'Close OBS Studio', text: 'The installer needs OBS Studio to be closed.' },
			{
				title: 'Download and run the installer',
				text: 'Get the setup file from the latest release and run it.'
			},
			{
				title: 'Let Windows run it',
				text: 'The installer is not signed, so Windows shows a blue "Windows protected your PC" window. Click "More info", then "Run anyway".'
			}
		],
		useTitle: 'Then, in OBS Studio',
		useSteps: [
			'Under Sources, click + and add a LiveSubtitles source.',
			'Choose your microphone, the spoken language and the subtitle language.',
			'Tick "Enable LiveSubtitles". The status line shows "Listening" after a few seconds.',
			'Speak: the subtitles appear a second or two after each sentence.'
		],
		viewers:
			'Your viewers see nothing but the subtitles: the source stays empty while you are silent.'
	},
	requirements: {
		title: 'Requirements and languages',
		items: [
			{ label: 'System', value: 'Windows 10 or 11 (64-bit)' },
			{ label: 'OBS Studio', value: 'Version 31.1 or later' },
			{ label: 'Disk space', value: 'About 300 MB' },
			{ label: 'Memory', value: 'About 500 MB while it listens' },
			{
				label: 'Languages',
				value: 'French and English, in both directions, or subtitles without translation'
			}
		],
		upcoming: 'LiveSubtitles keeps improving, and more languages are being considered, including Russian.',
		upcomingLink: 'Missing a language? Tell us on GitHub.',
		limitsTitle: 'Good to know',
		limits: [
			'Subtitles appear a second or two after each sentence, not word by word.',
			'The translation is done by a small model on your computer: it is good for everyday speech, not perfect, and it does not know streaming vocabulary well.',
			'One microphone and one subtitle language at a time. The subtitles are part of the picture: every viewer sees the same ones.',
			'Speed depends on your processor. It has not been measured on modest computers yet.'
		]
	},
	source: {
		title: 'Open source',
		text: 'The code, the licenses and the bug tracker are on GitHub.',
		repo: 'Source code',
		issues: 'Report a bug',
		license: 'License (GPL v2 or later)',
		thirdParty: 'Third-party software and models'
	},
	footer: {
		madeBy: 'Made by',
		logoAlt: 'YS logo',
		privacy: 'This site uses no cookies, no analytics and no third-party resources.'
	}
};

export type Dictionary = typeof en;
