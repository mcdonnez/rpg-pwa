import ChainHalfArmor from './ChainHalfArmor';
import PlateHalfArmor from './PlateHalfArmor';
import armors from './armors.json';

let armorsMap = armors.reduce((armorsMap, armor) => {
	armorsMap[armor.name] = armor;
	return armorsMap;
}, {});

export default {
	ChainHalfArmor,
	PlateHalfArmor,
	...armorsMap
};
