import News from './News';
import { NewsType } from '../../models/interfaces';
import AdsWrapper from './AdsWrapper';

const DUMMY_NEWS: NewsType[] = [
	{
		title: "Neuralink? What's the Latest?",
		text: 'Neuralink: a cutting-edge brain-computer interface company founded by Elon Musk, aims to restore vision, mobility, and potentially treat conditions such as paralysis and blindness...',
		tags: ['#Neuralink', '#ElonMusk'],
	},
	{
		title: "Quantum Computing? What's the Latest?",
		text: 'Quantum Computing: a revolutionary computing paradigm that leverages the principles of quantum mechanics to process information. Quantum computers use quantum bits, or qubits...',
		tags: ['#QuantumComputing'],
	},
];

const NewsContainer = (): JSX.Element => {
	return (
		<AdsWrapper title="What's happening">
			{DUMMY_NEWS.map((news, index) => (
				<News key={index} {...news} />
			))}
		</AdsWrapper>
	);
};

export default NewsContainer;
