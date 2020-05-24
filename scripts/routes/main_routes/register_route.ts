import { Router, Request, Response } from "express";
import { route_name } from "../../route_name";
import { Token } from "../../utils/token";
import { database } from "../../mongoose/mongoose";
const router = Router();

router.post(
  route_name.main_routes.register,
  (request: Request, response: Response) => {
    if (request.body == null) {
      //收到的注册的数据为null
      response.send({ code: "3001" });
      return;
    }
    if (request.body["username"] == null || request.body["password"] == null) {
      //收到的value为null
      response.send({ code: "3002" });
      return;
    }
    database.UserInfo.find(
      { username: request.body["username"] },
      (err, findResult) => {
        if (err) {
          //数据库查找err
          response.send({ code: "3003" });
        } else {
          if (findResult.length == 0) {
            database.UserInfo.insertMany(
              {
                username: request.body["username"],
                password: request.body["password"],
                user_icon: 0,
                register_time: Date.now(),
              },
              (err, insertResult) => {
                if (err) {
                  //插入数据库err
                  response.send({ code: "3004" });
                  console.log(err);
                } else {
                  //插入数据库成功
                  Token.generateToken(
                    {
                      user_id: insertResult[0]["_id"],
                      password: request.body["password"],
                    },
                    (err, encoded) => {
                      if (err) {
                        //数据库插入新用户成功，但token生成失败
                        response.send({ code: "3005" });
                      } else {
                        if (encoded == null) {
                          //数据库插入新用户成功，生成的encoded未定义
                          response.send({ code: "3006" });
                        } else {
                          //数据库插入新用户成功，token生成成功
                          response.setHeader("token", encoded);
                          response.send({ code: "3007" });
                        }
                      }
                    }
                  );
                }
              }
            );
          } else if (findResult.length == 1) {
            //该用户已存在
            response.send({ code: "3008" });
          } else {
            //数据库存在多个重复用户
            response.send({ code: "3009" });
          }
        }
      }
    );
  }
);

export { router as register_router };
