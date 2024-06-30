import mongoose from 'mongoose';

const Course_Schema = new mongoose.Schema({
	id: { type: String, require: true, unique: true },
	name: { type: String, require: true, unique: true },
	location: { type: String, require: true },
	in_par: { type: Number, require: true },
	out_par: { type: Number, require: true },
	total_par: { type: Number, require: true },
	tees: [
		{
			color: { type: String, require: true },
			holes: [
				{
					number: { type: Number, require: true },
					par: { type: Number, require: true },
					distance: { type: Number, require: true },
					hcp: { type: Number, require: true }
				}
			],
			in_distance: { type: Number, require: true },
			out_distance: { type: Number, require: true },
			total_distance: { type: Number, require: true }
		}
	],
	rating: [
		{
			men: [
				{
					tee: { type: String },
					course: { type: Number },
					slope: { type: Number }
				}
			],
			ladies: [
				{
					tee: { type: String },
					course: { type: Number },
					slope: { type: Number }
				}
			]
		}
	]
});

const Game_Schema = new mongoose.Schema({
	id: { type: String },
	type: { type: String },
	owner: { type: String },
	site: { type: String },
	name: { type: String },
	teams: { type: String },
	date: { type: String },
	data: { type: String },
	is_over: { type: Boolean, default: false }
});

const Quizle_Schema = new mongoose.Schema({
	chapter: {
		de: { type: String },
		en: { type: String },
		es: { type: String },
		fr: { type: String },
		it: { type: String },
		pt: { type: String }
	},
	sections: [
		{
			rule: {
				de: { type: String },
				en: { type: String },
				es: { type: String },
				fr: { type: String },
				it: { type: String },
				pt: { type: String }
			},
			questions: [
				{
					question: {
						de: { type: String },
						en: { type: String },
						es: { type: String },
						fr: { type: String },
						it: { type: String },
						pt: { type: String }
					},
					options: [
						{
							letter: { type: String },
							text: {
								de: { type: String },
								en: { type: String },
								es: { type: String },
								fr: { type: String },
								it: { type: String },
								pt: { type: String }
							}
						}
					],
					correct_answer: {
						letter: { type: String },
						text: {
							de: { type: String },
							en: { type: String },
							es: { type: String },
							fr: { type: String },
							it: { type: String },
							pt: { type: String }
						}
					},
					explanation: {
						de: { type: String },
						en: { type: String },
						es: { type: String },
						fr: { type: String },
						it: { type: String },
						pt: { type: String }
					}
				}
			]
		}
	]
});

/**
 * The Mongoose model for the Course collection.
 */
export const Course_Model = mongoose.model('Course', Course_Schema);
export const Game_Model = mongoose.model('Game', Game_Schema);
export const Quizle_Model = mongoose.model('Quizle', Quizle_Schema);
