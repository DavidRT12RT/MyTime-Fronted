import moment from "moment";

export const horaMes = (fecha) => {

    const hoyMes = moment(fecha).format("HH:mm a | MMMM Do");

    return hoyMes;

}