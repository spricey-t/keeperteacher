
const mongoose = require('mongoose');

var DrillSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'drill name is required'
    },
    legacyId: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true,
        required: 'category is required'
    },
    objective: {
        type: String,
        trim: true,
        required: 'objective is required'
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
