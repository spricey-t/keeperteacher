
const mongoose = require('mongoose');

var DrillSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'drill name is required'
	},
	videoUrl: {
		type: String,
		trim: true,
		required: 'video url is required'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('drill', DrillSchema);
