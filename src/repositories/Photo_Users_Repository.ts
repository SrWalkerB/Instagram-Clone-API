import { EntityRepository, Repository } from "typeorm";
import Photo_Users from "../models/Photo_Users";

@EntityRepository(Photo_Users)
class Photo_Users_Repository extends Repository<Photo_Users>{}


export default Photo_Users_Repository;