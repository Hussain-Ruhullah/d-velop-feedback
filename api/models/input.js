const mangoose = require('mangoose');
const Schema = mangoose.Schema;

//create input Schema  model
const InputSchema = new Schema({
    firstName: {
        type: String,
        // required: [true,'Name Field is required']
    },
    lastName:{
        type: String
    },
    email: {
        type: String
    },phone:{
        type: Number    
    },message:{
        type: String
    }
        // add in geo location or other things
})
const UInput = mongoose.model('input',InputSchema);

module.exports = UInput;