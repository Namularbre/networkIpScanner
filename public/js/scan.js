class Model {

    getScanStatus() {
        return document.querySelector('#scanStatus').textContent;
    }
}

class Controller {
    model;
    view;

    constructor() {
        this.model = new Model();
        this.view = new View();
    }

    init() {
        const scanStatus = this.model.getScanStatus();
        console.log("test");
        console.log(scanStatus);
    }
}

class View {
    showScanStatus(scanStatus) {
        const alertDiv = document.querySelector("#alert");

        if (scanStatus === "ok") {
            alertDiv.textContent = "Scan terminé !";
            alertDiv.classList.add("alert-success");
        }
    }
}

const controller = new Controller();
controller.init();
