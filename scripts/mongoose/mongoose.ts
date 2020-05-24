import mongoose from "mongoose";

//这时候已经连接上了
mongoose.connect("mongodb://127.0.0.1:27017/dzapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//mongoose.connection只是用来监听状态的，可以需要，也可以不需要
mongoose.connection.once("open", () => {
  console.log("数据库已连接...");
});
var ObjId = mongoose.Schema.Types.ObjectId;

var user_info_schema = new mongoose.Schema({
  //_id:自动创建
  username: { type: String, required: true },
  password: { type: String, required: true },
  user_icon: { type: Number, required: true },
  register_time: { type: Number, required: true },
  //dzs:从dz_info中寻找
});

var dz_info_schema = new mongoose.Schema({
  //_id:自动创建
  user_id: { type: ObjId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  short_content: { type: String, required: true },
  create_time: { type: Number, required: true },
  update_time: { type: Number, required: true },
  //star_count:从dz_star_info中计算
  //like_count:从dz_like_info中计算
  //review_count:从dz_review1_info中计算
  //stars:从dz_star_info中寻找
  //likes:从dz_like_info中寻找
  //reviews:从dz_review1_info中寻找
});

var dz_star_info_schema = new mongoose.Schema({
  //_id:自动创建
  dz_id: { type: ObjId, required: true },
  starer_user_id: { type: ObjId, required: true },
});

var dz_like_info_schema = new mongoose.Schema({
  //_id:自动创建
  dz_id: { type: ObjId, required: true },
  liker_user_id: { type: ObjId, required: true },
});

var dz_review1_info_schema = new mongoose.Schema({
  //_id:自动创建
  dz_id: { type: ObjId, required: true },
  reviewer_user_id: { type: ObjId, required: true },
  content: { type: String, required: true },
  create_time: { type: Number, required: true },
  like_count: { type: Number, required: true },
  //reviews:从dz_review2_info中寻找
});

var dz_review2_info_schema = new mongoose.Schema({
  //_id:自动创建
  dz_review1_id: { type: ObjId, required: true },
  reviewer_user_id: { type: ObjId, required: true },
  content: { type: String, required: true },
  create_time: { type: Number, required: true },
  like_count: { type: Number, required: true },
});

var database = {
  UserInfo: mongoose.model("UserInfo", user_info_schema, "user_info"),
  DzInfo: mongoose.model("DzInfo", dz_info_schema, "dz_info"),
  DzStarInfo: mongoose.model("DzStarInfo", dz_star_info_schema, "dz_star_info"),
  DzLikeInfo: mongoose.model("DzLikeInfo", dz_like_info_schema, "dz_like_info"),
  DzReview1Info: mongoose.model(
    "DzReview1Info",
    dz_review1_info_schema,
    "dz_review1_info"
  ),
  DzReview2Info: mongoose.model(
    "DzReview2Info",
    dz_review2_info_schema,
    "dz_review2_info"
  ),
};
export { database };
