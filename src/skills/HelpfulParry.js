import Skill from './Skill';

const options = {
	name: 'Helpful Parry',
	numericalBonus: '',
	effect: `if enemy attacking ally and ally being attacked 
	are both within reach, you can roll parry and add it to 
	ally's defense[once per moment]`
};

export default new Skill(options);
