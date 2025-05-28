import { UserDocument } from "../src/model/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
      validatedData?: unknown;
    }
  }
}
