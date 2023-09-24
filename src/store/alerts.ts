import {makeAutoObservable} from "mobx";
import {IAlert} from "../models/interfaces/IAlert";


class Alerts {

	isLoading = false;

	setIsLoading = (value: boolean) => {
		this.isLoading = value;
	}

    alert: IAlert = {
        severity: 'success',
        message: 'Success!'
    }

    dialog = {
        title: '',
        body: ''
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

    openInfoDialog(title: string, body: string) {
        this.dialog = {
            title: title,
            body: body
        }
    }

}

export default new Alerts();