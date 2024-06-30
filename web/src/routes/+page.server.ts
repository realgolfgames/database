import { Course_Model, Game_Model, Quizle_Model } from '$lib/server/models';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let courses = await Course_Model.find({});
	let games = await Game_Model.find({});
	let quizles = await Quizle_Model.find({});

	// Prepare course data
	courses = courses.map((course) => {
		const courseCopy = JSON.parse(JSON.stringify(course));
		delete courseCopy._id;
		return courseCopy;
	});

	games = games.map((game) => {
		const gameCopy = JSON.parse(JSON.stringify(game));
		delete gameCopy._id;
		return gameCopy;
	});

	quizles = quizles.map((quizle) => {
		const quizleCopy = JSON.parse(JSON.stringify(quizle));
		delete quizleCopy._id;
		return quizleCopy;
	});

	const coursesJson = JSON.stringify(courses, null, 2);
	const gamesJson = JSON.stringify(games, null, 2);
	const quizlesJson = JSON.stringify(quizles, null, 2);

	return { coursesJson, courses, gamesJson, games, quizlesJson, quizles};
};
