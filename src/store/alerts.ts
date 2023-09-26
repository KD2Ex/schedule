import {makeAutoObservable} from "mobx";
import {IAlert} from "../models/interfaces/IAlert";
import {IDialog} from "../models/interfaces/IDialog";


class Alerts {

	isLoading = false;

	setIsLoading = (value: boolean) => {
		this.isLoading = value;
	}

    alert: IAlert = {
        severity: 'success',
        message: 'Success!'
    }

    dialog: IDialog = {
        title: '',
        body: '',
        open: false
        //callback: () => null,
    }

    constructor() {
        makeAutoObservable(this)
    }

    openSuccessAlert(message: string) {
        this.alert = {message: message, severity: 'success'};
    }

    openErrorAlert(message: string) {
        this.alert = {message: message, severity: 'error'};
    }

    openWarningAlert(message: string) {
        this.alert = {message: message, severity: 'warning'};
    }

	openInfoAlert(message: string) {
		this.alert = {message: message, severity: 'info'};
	}

    openInfoDialog(title: string, body: string, callback?: () => any, props?: any[]) {
        const newDialog = {
            title: title,
            body: body,
            open: true
        }

        if (callback) {
            this.dialog = {...newDialog, callback: callback, props: [...props]}
        } else {
            this.dialog = {
                ...newDialog
            }
        }

        console.log(this.dialog)
    }

    resetDialog() {
        this.dialog = {
            title: '',
            body: '',
            open: false
        }
    }

}

export default new Alerts();