import { Component } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { auth, SignInWithGoogle } from "../../firebase/firebase.utils";

export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
	}
	handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = this.state;
		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: "", password: "" });
		} catch (error) {
			console.error(error);
		}
	};
	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};
	render() {
		return (
			<div className="sign-in">
				<h1 className="title">I already have an account</h1>
				<span className="subtitle">Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						value={this.state.email}
						label="Email"
						handleChange={this.handleChange}
						required
					/>
					<FormInput
						name="password"
						type="password"
						value={this.state.password}
						label="Password"
						handleChange={this.handleChange}
						required
					/>
					<div className="buttons">
						<CustomButton type="submit">Sign In</CustomButton>
						<CustomButton onClick={SignInWithGoogle} isGoogleSignIn>
							Sign In With Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}
