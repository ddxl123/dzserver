import jwt, { VerifyErrors, VerifyCallback } from "jsonwebtoken";

class Token {
  //生成token
  static generateToken(
    data: string | object | Buffer,
    callback: (err: Error | null, encoded: string | undefined) => void,
    expiresIn: string | number = (365 * 100).toString() + "d"
  ) {
    jwt.sign(data, "token_secret", { expiresIn: expiresIn }, (err, encoded) => {
      callback(err, encoded);
    });
  }

  // 校验token
  static verifyToken(token: string, callback: VerifyCallback) {
    jwt.verify(
      token,
      "token_secret",
      (err: VerifyErrors | null, decoded: object | undefined) => {
        callback(err, decoded);
      }
    );
  }
}

export { Token };
