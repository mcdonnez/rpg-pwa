import Character from './Character';
import oldCharacters from './characters.json';
import axios from 'axios';
import getContent from '../content';

let characterMap = null;
async function getCharacters() {
	if (characterMap) {
		return characterMap;
	}
	let response = await axios.get('/api/data/Characters');
	let characters = response.data;

	let content = await getContent();

	characterMap = characters.reduce((characterMap, character) => {
		characterMap[character.id] = new Character(character, content);
		return characterMap;
	}, {
		custom: new Character()
	});
	// console.log(characterMap);
	// console.log(oldCharacters.reduce((characterMap, character) => {
	// 	characterMap[character.id] = new Character(character);
	// 	return characterMap;
	// }, {
	// 	custom: new Character()
	// }));

	return characterMap;
}


export default getCharacters;
