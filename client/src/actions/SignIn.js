import { signIn } from "../Api";
import signInSuccess from "./SignInSuccess";
import signInFailure from "./SignInFailure";

export default (email, password) => dispatch => {
    return dispatch(
        signIn(email, password)
            .then((res) => {
                let res_json = res.json();
                if (!res.ok) throw Error(res);
                return res_json})
            .then(user => {
                return signInSuccess(user)})
            .catch(error => signInFailure("Email or password not correct"))
    )
}
