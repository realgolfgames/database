import { Course_Model } from '$lib/server/models';
import { courses } from '../lib/types/courses';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const courses: courses[] = await Course_Model?.find({});

	const coursesCopy = courses?.map((course) => {
		const courseCopy = JSON.parse(JSON.stringify(course));
		delete courseCopy._id; // Remove the _id field
		return courseCopy;
	});

	console.log(coursesCopy);
	return { courses: coursesCopy };
};
