import AdsWrapper from './AdsWrapper';
import { FollowType } from '../../models/interfaces';
import Follow from './Follow';

const DUMMY_FOLLOWS: FollowType[] = [
	{
		name: 'Elon Musk',
		nick: '@Elonmusk',
		image:
			'https://v.wpimg.pl/QUJDREVGfjQrJiR2eTxzIWh-cCw_ZX13P2ZoZ3lxY2EyazQsOiIjMDorfCIkMiE0PTR8NTpoMCUjayR0eSM4JjooMzx5Ijw3LyB9I2Z2MjN9dTFoN3NlYWdwZ3BkajA2ciJ_IzAkYWx5djFzMHE1dzc',
	},
	{
		name: 'React',
		nick: '@React',
		image:
			'https://daily-dev-tips.com/ezoimgfmt/cdn.hashnode.com/res/hashnode/image/upload/v1647492266631/rH6yDfWyJ.png?ezimgfmt=rs:380x337/rscb2/ngcb2/notWebP',
	},
	{
		name: 'Typescript',
		nick: '@Ts',
		image: 'https://w7.pngwing.com/pngs/915/519/png-transparent-typescript-hd-logo-thumbnail.png',
	},
];

const FollowContainer = (): JSX.Element => {
	return (
		<AdsWrapper title='Who to follow'>
			{DUMMY_FOLLOWS.map((follow, index) => (
				<Follow key={index} {...follow} />
			))}
		</AdsWrapper>
	);
};

export default FollowContainer;
