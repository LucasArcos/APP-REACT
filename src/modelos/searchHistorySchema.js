import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
    city: String,
    country: String,
    temp: String,
    condition: String,
    icon: String,
    conditionText: String,
    searchedAt: { type: Date, default: Date.now }
})

const searchHistory = mongoose.model("Historial", searchHistorySchema)


const SearchHistory = searchHistory

export default SearchHistory