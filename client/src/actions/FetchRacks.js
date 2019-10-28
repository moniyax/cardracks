import {getRacks} from '../Api'
import receiveRacks from "../actions/ReceiveRacks"

export default () => (dispatch) => {
    return getRacks()
    .then(response => response.json())
    .then(racks => dispatch( receiveRacks(racks)))
    .catch(error => console.log(error));
}