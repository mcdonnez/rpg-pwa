import aspects from './aspects.json';

export default aspects.reduce((aspectMap, aspect) => {
	aspectMap[aspect.name] = aspect;
	return aspectMap;
}, {});
