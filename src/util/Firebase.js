//const firebase = require('firebase');
//require('firebase/firestore');

export class Firebase {

    constructor() {


        this.init();

    }

    init() {


        const firebaseConfig = {

            apiKey: "AIzaSyCwxSqDA4RsL7uBOj7p6KUUQExg590tRvU",
            authDomain: "whatsapp-clone-e3e90.firebaseapp.com",
            projectId: "whatsapp-clone-e3e90",
            storageBucket: "whatsapp-clone-e3e90.appspot.com",
            messagingSenderId: "483796488663",
            appId: "1:483796488663:web:f243041bfb3bce4985fb92",
            measurementId: "G-BGZ56F7N05"

        };




        if (!window._initializedFirebase) {

            firebase.initializeApp(firebaseConfig);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            })
            if (firebase) {
                console.log("Firebase Status: Running");
            }
            window._initializedFirebase = true;

        }

        if (firebase) {
            console.log("Database Running!");
        }

    }


    static db() {

        return firebase.firestore();
    }

    static hd() {

        return firebase.storage();
    }

    initAuth() {

        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result => {

                let token = result.credential.acessToken;
                let user = result.user;

                s(user, token);

            }).catch(err => {

                f(err);

            });

        });

    }

}