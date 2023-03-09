import { classEvent } from "../util/classEvent";

export class microphoneController extends classEvent {

    constructor() {

        super();

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {

            this._stream = stream;

            let audio = new Audio()

            audio.srcObject = new MediaStream(stream);

            audio.play();

            this.trigger('play', audio);

        }).catch(err => {

            console.error(err);

        });
    }

    stop() {

        this._stream.getTracks().forEach(tracks => {

            tracks.stop();

        });

    }

}