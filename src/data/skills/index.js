import HelpfulParry from './HelpfulParry';
import ExpertArmingSword from './ExpertArmingSword';
import TankyFighterProficient from './TankyFighterProficient';
import Precise from './Precise';
import Reliable from './Reliable';
import skills from './skills.json';

let skillsMap = skills.reduce((skillsMap, skill) => {
	skillsMap[skill.name] = skill;
	return skillsMap;
}, {});

export default {
	HelpfulParry,
	ExpertArmingSword,
	TankyFighterProficient,
	Precise,
	Reliable,
	...skillsMap
};
