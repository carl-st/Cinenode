/**
 * Created by Karol on 09.05.2017.
 */
import * as mongoose from 'mongoose';


export default function mongooseConf() {

    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/cinenode";

    mongoose.connect(MONGODB_CONNECTION, (error) => {

        if (error) {
            throw error;
        }

        console.log("mongo connected");

    });

}
