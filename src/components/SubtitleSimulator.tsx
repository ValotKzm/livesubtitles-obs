import { useEffect, useState } from 'react';
import type { Dictionary } from '../i18n';

type Lang = 'fr' | 'en';
type Phase = 'speaking' | 'waiting' | 'shown' | 'fading';

interface Props {
	t: Dictionary['demo']['simulator'];
}

// Phrases écrites à l'avance dans les deux langues : rien n'est capté ni traduit.
const sentences: Record<Lang, string>[] = [
	{ fr: 'Bonjour à tous, bienvenue sur le stream !', en: 'Hello everyone, welcome to the stream!' },
	{
		fr: "Aujourd'hui, on commence un tout nouveau jeu.",
		en: 'Today we are starting a brand new game.'
	},
	{
		fr: 'Dites-moi dans le chat si vous m’entendez bien.',
		en: 'Tell me in the chat if you can hear me well.'
	},
	{ fr: 'Merci beaucoup pour votre soutien.', en: 'Thank you very much for your support.' }
];

// Durée de chaque étape, en millisecondes. `waiting` reproduit le délai réel du
// plugin : une à deux secondes entre la fin de la phrase et le sous-titre.
const durations: Record<Phase, number> = {
	speaking: 2200,
	waiting: 1500,
	shown: 3500,
	fading: 600
};

const nextPhase: Record<Phase, Phase> = {
	speaking: 'waiting',
	waiting: 'shown',
	shown: 'fading',
	fading: 'speaking'
};

const languages: Lang[] = ['fr', 'en'];

export default function SubtitleSimulator({ t }: Props) {
	const [spoken, setSpoken] = useState<Lang>('fr');
	const [subtitle, setSubtitle] = useState<Lang>('en');
	const [index, setIndex] = useState(0);
	// Le rendu initial, celui que voit un visiteur sans JavaScript, montre une
	// phrase et son sous-titre.
	const [phase, setPhase] = useState<Phase>('shown');
	const [playing, setPlaying] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
		// Pas de lecture automatique si le visiteur a demandé moins d'animations.
		if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(true);
	}, []);

	useEffect(() => {
		if (!playing) return;
		const timer = setTimeout(() => {
			if (phase === 'fading') setIndex((i) => (i + 1) % sentences.length);
			setPhase(nextPhase[phase]);
		}, durations[phase]);
		return () => clearTimeout(timer);
	}, [playing, phase]);

	const sentence = sentences[index]!;
	const speaking = phase === 'speaking';
	const captionVisible = phase === 'shown';
	const status = speaking ? t.statusSpeaking : phase === 'waiting' ? t.statusWaiting : t.statusShown;

	function choose(setter: (lang: Lang) => void, lang: Lang) {
		setter(lang);
		// En pause, on montre tout de suite le résultat ; en lecture, la phrase repart du début.
		setPhase(playing ? 'speaking' : 'shown');
	}

	return (
		<div className="card sm:p-8">
			<fieldset disabled={!hydrated} className="grid gap-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
				<legend className="sr-only">{t.settings}</legend>
				<LanguageChoice
					name="spoken"
					label={t.spokenLabel}
					names={t.languages}
					value={spoken}
					onChange={(lang) => choose(setSpoken, lang)}
				/>
				<LanguageChoice
					name="subtitle"
					label={t.subtitleLabel}
					names={t.languages}
					value={subtitle}
					onChange={(lang) => choose(setSubtitle, lang)}
				/>
				<button
					type="button"
					onClick={() => setPlaying((p) => !p)}
					aria-pressed={playing}
					className="rounded-xl border border-line bg-surface-2 px-5 py-2.5 font-bold hover:border-accent disabled:opacity-50"
				>
					{playing ? t.pause : t.play}
				</button>
			</fieldset>

			<div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
				<div className="rounded-xl bg-surface-2 p-5">
					<p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted">
						<span
							className={`size-2.5 rounded-full ${speaking ? 'bg-accent motion-safe:animate-pulse' : 'bg-line'}`}
							aria-hidden="true"
						/>
						{t.youSay}
					</p>
					<p className="mt-3 text-lg font-semibold" lang={spoken}>
						{sentence[spoken]}
					</p>
					<p className="mt-4 text-sm text-muted">{status}</p>
				</div>

				<div>
					<p className="text-xs font-bold uppercase tracking-widest text-muted">{t.onStream}</p>
					{/* Scène de stream fictive : toujours sombre, comme une capture de jeu. */}
					<div className="relative mt-3 aspect-video overflow-hidden rounded-xl bg-linear-to-br from-[#1b2440] to-[#0d1220]">
						<div
							className="absolute right-[4%] top-[6%] aspect-video w-[24%] rounded-md border-2 border-[#44528a] bg-[#263156]"
							aria-hidden="true"
						/>
						<p className="absolute inset-x-[5%] bottom-[8%] text-center">
							<span
								lang={subtitle}
								className={`caption text-sm transition-opacity duration-500 motion-reduce:transition-none sm:text-lg ${captionVisible ? 'opacity-100' : 'opacity-0'}`}
							>
								{sentence[subtitle]}
							</span>
						</p>
					</div>
				</div>
			</div>

			<p className="mt-5 text-sm text-muted">
				{spoken === subtitle ? `${t.sameLanguage} ` : ''}
				{t.disclaimer}
			</p>
		</div>
	);
}

interface LanguageChoiceProps {
	name: string;
	label: string;
	names: Record<Lang, string>;
	value: Lang;
	onChange: (lang: Lang) => void;
}

function LanguageChoice({ name, label, names, value, onChange }: LanguageChoiceProps) {
	return (
		<fieldset>
			<legend className="text-sm font-bold">{label}</legend>
			<div className="mt-2 flex rounded-xl border border-line bg-surface-2 p-1">
				{languages.map((lang) => (
					<label
						key={lang}
						className="flex-1 cursor-pointer rounded-lg px-3 py-2 text-center font-semibold text-muted has-checked:bg-cta has-checked:text-cta-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
					>
						<input
							type="radio"
							name={name}
							value={lang}
							checked={value === lang}
							onChange={() => onChange(lang)}
							className="sr-only"
						/>
						{names[lang]}
					</label>
				))}
			</div>
		</fieldset>
	);
}
