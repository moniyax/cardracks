import {racksSchema} from "../Schema";
import { normalize } from "normalizr";

export default (racks) => {
    const normRacks = normalize(racks, racksSchema)
    console.log('normRacks',normRacks);
    
    return {type: 'RECEIVE_RACKS', payload: normRacks}
}