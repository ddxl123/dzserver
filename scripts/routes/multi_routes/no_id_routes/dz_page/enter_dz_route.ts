import { Router, Request, Response, request, response } from "express";
import { route_name } from "../../../../route_name";
import { tosend } from "../../../../utils/tosend";
import { ObjectID } from "mongodb";
import { database } from "../../../../mongoose/mongoose";
const router = Router();

router.get(route_name.enter_dz, (request, response) => {
  console.log("request.query:", request.query);
  if (
    request.query == null ||
    request.query["dz_id"] == null ||
    request.query["dz_id"] == ""
  ) {
    //服务器接收到的query为null，或某个必须值为null
    tosend(response, () => response.send({ code: "6001" }));
    return;
  }
  toDB(request, response);
});

function toDB(request: Request, response: Response) {
  database.DzInfo.aggregate()
    .match({
      $expr: {
        $eq: ["$_id", new ObjectID(request.query["dz_id"].toString())],
      },
    })
    .lookup({
      from: "user_info",
      let: { user_id: "$user_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$_id", "$$user_id"],
            },
          },
        },
      ],
      as: "user_info",
    })
    .lookup({
      from: "dz_review1_info",
      let: { dz_id: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$dz_id", "$$dz_id"],
            },
          },
        },
      ],
      as: "dz_review1_info",
    })
    .project({
      _id: 0,
      dz_id: "$_id",
      username: { $arrayElemAt: ["$user_info.username", 0] },
      user_icon: { $arrayElemAt: ["$user_info.user_icon", 0] },
      title: "$title",
      content: "$content",
      create_time: "$create_time",
      update_time: "$update_time",
    })
    .then((value) => {
      console.log(value);
      //获取数据成功
      tosend(response, () => response.send({ code: "6002", data: value[0] }));
    })
    .catch((err) => {
      //获取数据err
      tosend(response, () => response.send({ code: "6003" }));
    });
}

export { router as enter_dz_router };
