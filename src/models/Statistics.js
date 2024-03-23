const { Schema, model, models } = require("mongoose");

const StatisticsSchema = new Schema({
    type: String,
    page:String,
    uri: String
}, { timestamps: true });

export const Statistics = models?.Statistics || model('Statistics', StatisticsSchema);