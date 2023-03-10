import { Firebase } from '../util/Firebase';
import { classEvent } from '../util/classEvent';


export class User extends classEvent {

    static getRef() {

        return Firebase.db().collection('/users');

    }

    static findByEmail(email) {

        return User.getRef().doc(email);

    }

}