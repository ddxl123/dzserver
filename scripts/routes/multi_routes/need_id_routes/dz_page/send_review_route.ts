import { Router, Request, Response } from "express";
import { route_name } from "../../../../route_name";
import { tosend } from "../../../../utils/tosend";
import { database } from "../../../../mongoose/mongoose";
import { ObjectID } from "mongodb";

const router = Router();

router.post(route_name.send_review, (request, response) => {
  if (
    request.body == null ||
    request.body["dz_id"] == null ||
    request.body["dz_id"] == "" ||
    request.body["dz_id"] == "null" ||
    request.body["content"] == null ||
    request.body["content"] == "" ||
    request.body["content"] == "null"
  ) {
    //收到的必需参数为null
    tosend(response, () => response.send({ code: "7001" }));
    return;
  }
  toDB(request, response);
});

function toDB(request: Request, response: Response) {
  database.DzReview1Info.insertMany(
    {
      dz_id: request.body["dz_id"], //会自动将string类型转换为ObjectId类型
      reviewer_user_id: request["user_id"],
      content: request.body["content"],
      create_time: Date.now(),
      like_count: 0,
    },
    (err, doc) => {
      if (err) {
        //插入err
        tosend(response, () => response.send({ code: "7002" }));
      } else {
        //插入成功
        tosend(response, () => response.send({ code: "7003" }));
      }
    }
  );
}

export { router as send_review };
