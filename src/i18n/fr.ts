import type { Dictionary } from './en';

export const fr: Dictionary = {
	meta: {
		title: 'LiveSubtitles : des sous-titres en direct pour OBS Studio',
		description:
			'Un plugin OBS Studio gratuit qui affiche en direct les sous-titres de ce que vous dites, traduits ou non. Il fonctionne entièrement sur votre ordinateur, sans compte, clé API ni serveur.'
	},
	nav: {
		skip: 'Aller au contenu',
		language: 'Langue',
		source: 'Code source',
		theme: 'Basculer entre le thème clair et le thème sombre'
	},
	hero: {
		title: 'Des sous-titres en direct sur votre stream, traduits ou non',
		lead: 'LiveSubtitles est un plugin OBS Studio qui affiche en direct, sur votre stream, les sous-titres de ce que vous dites. Touchez des viewers qui parlent une autre langue, ou rendez votre stream accessible aux personnes sourdes et malentendantes.',
		download: 'Télécharger pour Windows',
		downloadNote: 'Gratuit. Windows 10 ou 11, OBS Studio 31.1 ou plus récent.',
		example: {
			spokenLabel: 'Vous dites',
			spoken: 'Bonjour à tous, bienvenue sur le stream !',
			subtitleLabel: 'Vos viewers lisent',
			subtitle: 'Hello everyone, welcome to the stream!'
		}
	},
	demo: {
		title: 'Voyez-le en action',
		alt: "Démo provisoire : des sous-titres apparaissent puis s'effacent sur une scène de stream fictive.",
		caption:
			"Vous parlez dans votre microphone. Une à deux secondes après chaque phrase, le sous-titre apparaît sur votre stream, puis s'efface de lui-même.",
		placeholder: 'Démo provisoire : le véritable enregistrement arrive.'
	},
	arguments: {
		title: 'Pourquoi LiveSubtitles',
		items: [
			{
				title: 'Gratuit',
				text: "Ni abonnement, ni limite d'utilisation. LiveSubtitles est un logiciel libre sous licence publique générale GNU."
			},
			{
				title: 'Tout reste sur votre ordinateur',
				text: "Votre voix ne quitte jamais votre ordinateur et rien n'est enregistré. Une fois installé, le plugin fonctionne sans connexion internet."
			},
			{
				title: 'Sans compte ni clé API',
				text: 'Aucune inscription et aucun serveur à configurer : un installateur, une source à ajouter dans OBS, trois réglages.'
			}
		]
	},
	install: {
		title: 'Installer en trois étapes',
		steps: [
			{ title: 'Fermez OBS Studio', text: "L'installateur a besoin qu'OBS Studio soit fermé." },
			{
				title: "Téléchargez et lancez l'installateur",
				text: "Récupérez le fichier d'installation dans la dernière version et lancez-le."
			},
			{
				title: 'Autorisez son exécution dans Windows',
				text: "L'installateur n'est pas signé : Windows affiche une fenêtre bleue « Windows a protégé votre ordinateur ». Cliquez sur « Informations complémentaires », puis sur « Exécuter quand même »."
			}
		],
		useTitle: 'Ensuite, dans OBS Studio',
		useSteps: [
			'Dans Sources, cliquez sur + et ajoutez une source LiveSubtitles.',
			'Choisissez votre microphone, la langue parlée et la langue des sous-titres.',
			"Cochez « Activer LiveSubtitles ». La ligne État indique « À l'écoute » après quelques secondes.",
			'Parlez : les sous-titres apparaissent une à deux secondes après chaque phrase.'
		],
		viewers:
			'Vos viewers ne voient que les sous-titres : la source reste vide quand vous ne parlez pas.'
	},
	requirements: {
		title: 'Configuration requise et langues',
		items: [
			{ label: 'Système', value: 'Windows 10 ou 11 (64 bits)' },
			{ label: 'OBS Studio', value: 'Version 31.1 ou plus récente' },
			{ label: 'Espace disque', value: 'Environ 300 Mo' },
			{ label: 'Mémoire', value: "Environ 500 Mo pendant l'écoute" },
			{
				label: 'Langues',
				value: 'Français et anglais, dans les deux sens, ou sous-titres sans traduction'
			}
		],
		limitsTitle: 'Bon à savoir',
		limits: [
			'Les sous-titres apparaissent une à deux secondes après chaque phrase, pas mot à mot.',
			'La traduction est faite par un petit modèle sur votre ordinateur : elle convient à la conversation courante, sans être parfaite, et connaît mal le vocabulaire du streaming.',
			"Un seul microphone et une seule langue de sous-titres à la fois. Les sous-titres font partie de l'image : tous les viewers voient les mêmes.",
			"La rapidité dépend de votre processeur. Elle n'a pas encore été mesurée sur des ordinateurs modestes."
		]
	},
	source: {
		title: 'Logiciel libre',
		text: 'Le code, les licences et le suivi des bugs sont sur GitHub.',
		repo: 'Code source',
		issues: 'Signaler un bug',
		license: 'Licence (GPL v2 ou ultérieure)',
		thirdParty: 'Logiciels et modèles tiers'
	},
	footer: {
		madeBy: 'Créé par',
		logoAlt: 'Logo YS',
		privacy: "Ce site n'utilise ni cookies, ni statistiques, ni ressources tierces."
	}
};
