
const mongoose = require('mongoose');

var DrillSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'drill name is required'
    },
    category: {
        type: String,
        trim: true
    },
    objective: {
        type: String,
        trim: true
    },
    videoUrl: {
        type: String,
        trim: true,
        required: 'video url is required'
    },
    schematicUrl: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('drill', DrillSchema);
