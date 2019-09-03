import axios from 'axios';

let contentMap = null;
async function getContent() {
	if (contentMap) {
		return contentMap;
	}
	let response = await axios.get('/api/data');
	let content = response.data;

	contentMap = content.reduce((contentMap, content) => {
		contentMap[content.ID] = content;
		return contentMap;
	}, {});

	return contentMap;
}


export default getContent;
