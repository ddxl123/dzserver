import { route_name } from "../../route_name";
import { Router, Request, Response, NextFunction } from "express";
import { Token } from "../../utils/token";
import { database } from "../../mongoose/mongoose";
const router = Router();
//TODO: 密码更变后，客户端需要断线，服务器token需要加密的是用户名+密码
router.use(
  route_name.main_routes.need_id,
  (request: Request, response: Response, next: NextFunction) => {
    //使用express自带的server.use(express.json()); body解析器时，
    //1、body["xxx"]的xxx未定义时value typeof为undefined，为null时，value typeof为object
    //2、headers["xxx"]的xxx未定义时value typeof为undefined，为null时，value typeof为string，即value为'null'
    //由此得出，token未定义时才会执行token==null这一步，
    //而token定义为null时，不会走token==null这一步。
    const token = request.headers["token"];
    if (token == null) {
      //接收的token未定义
      response.send({ code: "2001" });
      return;
    }
    Token.verifyToken(token as string, (err, encoded) => {
      if (err) {
        //token校验失败,或失效,或不匹配,或token有定义但值为string类型的'null',或其他err
        response.send({ code: "2002" });
      } else {
        if (encoded == null) {
          //token校验的encoded未定义
          response.send({ code: "2003" });
        } else {
          //user_id的token校验成功
          database.UserInfo.findOne(
            {
              _id: encoded["user_id"], //Model会自动将字符串转换为ObjectId类型
            },
            (err, result) => {
              if (err) {
                //token校验通过，但数据库查找user_id err
                response.send({ code: "2004" });
              } else {
                if (result == null) {
                  //token校验通过，但数据库不存在解码后的user_id
                  response.send({ code: "2005" });
                } else {
                  request["user_id"] = encoded["user_id"]; //encoded["user_id"]是string类型
                  next();
                }
              }
            }
          );
        }
      }
    });
  }
);

export { router as need_id_router };
