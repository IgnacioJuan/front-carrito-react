import { ApiResponse } from "../../interfaces/Auth/ApiResponse";
import { User } from "../../interfaces/Auth/UserL";
import { fasicellService } from "./FasicellService";

export class AuthService{

   public static async login(obj:User):Promise<ApiResponse>{
      return (await fasicellService.post('/signin', obj)).data
   }

}