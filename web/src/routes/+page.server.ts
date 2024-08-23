import { Game_Model } from '$lib/server/models';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let games = await Game_Model.find({});

	games = games.map((game) => {
		const gameCopy = JSON.parse(JSON.stringify(game));
		delete gameCopy._id;
		return gameCopy;
	});

	const gamesJson = JSON.stringify(games, null, 2);

	return { gamesJson, games };
};
