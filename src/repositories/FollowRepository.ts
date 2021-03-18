import { EntityRepository, Repository } from "typeorm";
import Follow_User from "../models/Follow_User";

@EntityRepository(Follow_User)
class Follow_User_Repository extends Repository<Follow_User> {}


export default Follow_User_Repository;