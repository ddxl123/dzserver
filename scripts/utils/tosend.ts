import { Response } from "express";
const tosend = (response: Response, callback: Function) => {
  if (response["issend"] == null) {
    callback();
    response["issend"] = true;
  }
};

export { tosend };
