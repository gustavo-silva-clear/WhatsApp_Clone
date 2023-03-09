import { classEvent } from "../util/classEvent";

export class microphoneController extends classEvent {

    constructor() {

        super();

        this._mimeType = 'audio/webm'

        this._available = false;

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {

            this._available = true;

            this._stream = stream;
  
            this.trigger('ready', this._stream);

        }).catch(err => {

            console.error(err);

        });
    }

    isAvailable() {

        return this._available;

    }

    stop() {

        this._stream.getTracks().forEach(tracks => {

            tracks.stop();

        });

    }

    startRecorder() {

        if (this.isAvailable()) {

            this._mediaRecorder = new MediaRecorder(this._stream ,{

                mimeType: this._mimeType

            });

            this._recordedChunks = [];

            this._mediaRecorder.addEventListener('dataavailable' , e =>{

                if(e.data.size > 0){

                    this._recordedChunks.push(e.data);

                } 

            });

            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recordedChunks , {type: this._mimeType});

                let fileName = `rec${Date.now()}.webm`

                let file =  new File([blob], fileName, {type: this._mimeType , lastModified: Date.now()});
                 
                console.log('file' , file);

                let reader = new FileReader();

                reader.onload = e =>{

                    let audio = new Audio(reader.result);

                    audio.play();

                }

                reader.readAsDataURL(file);

            });

            this._mediaRecorder.start();

        }

    }


    stopRecorder() {

        if (this.isAvailable()) {

            this._mediaRecorder.stop();
            this.stop();

        }

    }

}