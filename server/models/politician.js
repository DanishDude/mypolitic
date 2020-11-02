const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const politicianSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true},
  firstname: {type: String},
  lastname: {type: String},
  profilePhoto: {type: String, default: undefined},
  dateOfBirth: {type: Date, default: undefined},
  profession: {type: String, default: undefined},
  education: [{
    title: {type: String},
    school: {type: String},
    city: {type: String},
  }],
  office: {type: String, default: undefined},       //  Qualité ou Fonctions ???
  party: {type: String, default: undefined},
  city: [{type: String, default: undefined}],
  presentation: {type: String, default: undefined},
  programme: [{
    category: {type: String},
    customCategory: {type: String, default: undefined},
    description: {type: String},
  }],
  team: [{type: Schema.Types.ObjectId, ref: 'User', unique: true, default: undefined}],
  unregisteredTeam: [{
    firstname: {type: String},
    lastname: {type: String},
    party: {type: String},
    photo: {type: String}
  }],
  interviews: [{
    title: {type: String},
    date: {type: Date},
    dateUpload: {type: Date, default: Date.now()},
    link: {type: String},
  }],
  phone: [{type: String, select: false, default: undefined}],
  instagram: {type: String, default: undefined},
  facebook: {type: String, default: undefined},
  linkedin: {type: String, default: undefined},
  youtube: {type: String, default: undefined}
});

const Politician = mongoose.model('Politician', politicianSchema);

module.exports = Politician;
