import { Router, Request, Response } from "express";
import { route_name } from "../../../../route_name";
import { tosend } from "../../../../utils/tosend";
import { database } from "../../../../mongoose/mongoose";

const router = Router();
router.post(route_name.create_dz, (request: Request, response: Response) => {
  if (request.body == null) {
    //收到的body为null
    tosend(response, () => response.send({ code: "4001" }));
    return;
  }
  database.DzInfo.insertMany(
    {
      user_id: request["user_id"], //string类型会被自动转换为ObjectId类型
      title: request.body["title"],
      content: request.body["content"],
      //把开头所有的\r\n去掉，把所有的连续超过两个\r\n替换成一个\n
      short_content: request.body["content"]
        .substr(0, 100)
        .replace(/^\r+|^\n+/g, "")
        .replace(/\r+|\n+/g, "\n"),
      create_time: Date.now(),
      update_time: Date.now(),
    },
    (err, result) => {
      console.log("result:", result);
      if (err) {
        //插入dz_card_info err
        tosend(response, () => response.send({ code: "4002" }));
      } else {
        //插入成功
        tosend(response, () => response.send({ code: "4003" }));
      }
    }
  );
});

export { router as create_dz_router };
