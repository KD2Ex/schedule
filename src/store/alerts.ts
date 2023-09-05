import {makeAutoObservable} from "mobx";
import {IAlert} from "../models/interfaces/IAlert";
import {AlertType} from "../models/types/AlertType";


class Alerts {

	isLoading = false;

	setIsLoading = (value: boolean) => {
		this.isLoading = value;
	}

    alert: IAlert = {
        severity: 'success',
        message: 'Success!'
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

}

export default new Alerts();