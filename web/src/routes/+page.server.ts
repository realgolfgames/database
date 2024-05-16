import { Course_Model } from '$lib/server/models';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let courses = await Course_Model.find({});

	courses = courses.map((course) => {
		const courseCopy = JSON.parse(JSON.stringify(course));
		delete courseCopy._id;
		return courseCopy;
	});

	return {
		courses
	};
};
