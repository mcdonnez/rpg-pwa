import Character from './Character';
import weapons from '../weapons';
import armors from '../armors';
import skills from '../skills';

class Fighter extends Character {
	constructor(options = {}) {
		options = {
			name: 'Tanky Fighter',
			fortitude: 5,
			resolve: 3,
			size: 7,
			bulk: 6,
			burden: 12,
			coordination: 4,
			perception: 3,
			speed: 3,
			strength: 5,
			education: 2,
			intellect: 2,
			insight: 3,
			wit: 2,
			entropy: 0,
			focus: 0,
			spirit: 0,
			truth: 0,
			weapon: weapons.ArmingSword,
			armors: [armors.PlateHalfArmor, armors.ChainHalfArmor],
			aspects: [skills.TankyFighterProficientAspect, skills.Precise, skills.Reliable, skills.ExpertArmingSword],
			ext: skills.HelpfulParry,
			...options
		};
		super(options);
	}
}

export default Fighter;
