


const mongoose = require('mongoose');
const config = require('config');
const request = require('sync-request');

const DB_HOST = config.get('db.host');
const LEGACY_API = config.get('legacyApi');
const EMAIL = config.get('user.email');
const PASSWORD = config.get('user.password');

mongoose.Promise = Promise;

const LegacyDrillSchema = new mongoose.Schema({
    drillName: {
        type: String,
        trim: true,
        required: 'Drill name is required!'
    },
    objective: {
        type: String,
        trim: true,
        required: 'Drill objective is required!'
    },
    schematic: {
        type: String,
        trim: true,
        required: 'Schematic image is required!'
    },
    url: {
        type: String,
        trim: true,
        required: 'Drill video is required!'
    },
    viewCount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        trim: true,
        required: 'Drill category is required!',
        validate: [
            function(category) {
                return category.length < 50;
            },
            'Drill category must be less than 50 characters!'
        ]
    },
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date
    }
});
mongoose.model('legacydrill', LegacyDrillSchema);

const DrillSchema = new mongoose.Schema({
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

const Drill = mongoose.model('drill');
const db = mongoose.connect(DB_HOST);

var res = request('POST', LEGACY_API + '/authenticate', {
    json: {
        email: EMAIL,
        password: PASSWORD
    }
});

var token = JSON.parse(res.body).token;
console.log('token: ' + token);

res = request('GET', LEGACY_API + '/api/drills', {
    headers: {
        'x-access-token': token
    }
});
var legacyDrills = JSON.parse(res.body);

for(var i = 0; i < legacyDrills.length; i++) {
    var legacyDrill = legacyDrills[i];
    var drill = new Drill({
        name: legacyDrill.drillName,
        category: legacyDrill.category,
        objective: legacyDrill.objective,
        videoUrl: legacyDrill.url,
        schematicUrl: legacyDrill.schematic
    });
    drill.save((err, persisted) => {
        if(err) console.error(err);
    });
}

mongoose.disconnect();
