import { EntityRepository, Repository } from "typeorm";
import Photo_Like from "../models/Photo_Like";

@EntityRepository(Photo_Like)
class Photo_Like_Repository extends Repository<Photo_Like>{}

export default Photo_Like_Repository;