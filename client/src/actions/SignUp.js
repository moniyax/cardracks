import { signUp } from "../Api";
import signUpSuccess from "./SignUpSuccess";
import signInFailure from "./SignInFailure";

export default (name, email, password) => dispatch => {
    return dispatch(
        signUp(name, email, password)
            .then((res) => {
                let res_json = res.json();
                if (!res.ok) throw Error(res);
                return res_json})
            .then(user => signUpSuccess(user))
            .catch(error => signInFailure("Could not sign up"))
    )
}
