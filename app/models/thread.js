/**
 * Thread Schema.
 */
var ThreadSchema = new Schema({
  name: String,
  message: String,
  updated: Date
});

mongoose.model('Thread', ThreadSchema);
