import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
	// const router = useRouter();
	const [email, setEmail] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [variant, setVariant] = useState("login");

	const toggleVariant = useCallback(() => {
		setVariant((currentVariant) =>
			currentVariant === "login" ? "register" : "login"
		);
	}, []);

	const login = useCallback(async () => {
		try {
			await signIn("credentials", {
				email,
				password,
				// redirect: false,
				callbackUrl: "/profiles",
			});
			// router.push("/");
		} catch (error) {
			console.log(error);
		}
		// router
	}, [email, password]);

	const register = useCallback(async () => {
		try {
			await axios.post("/api/register", {
				email,
				name,
				password,
			});
			login();
		} catch (error) {
			console.log(error);
		}
	}, [email, name, password, login]);

	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
			<div className="bg-black w-full h-full lg:bg-opacity-50">
				<nav className="px-12 py-5">
					<img src="/images/logo.png" alt="Logo" className="h-12" />
				</nav>
				<div className="flex justify-center">
					<div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
						<h2 className="text-white text-4xl mb-8 font-semibold">
							{variant === "login" ? "Sign in" : "Create Account"}
						</h2>
						<div className="flex flex-col gap-4">
							{variant === "register" && (
								<Input
									id={"Username"}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>
									) => setName(e.target.value)}
									value={name}
									label={"Username"}
								/>
							)}

							<Input
								id={"Email"}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setEmail(e.target.value)}
								value={email}
								label={"Email"}
							/>
							<Input
								id={"Password"}
								type="password"
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setPassword(e.target.value)}
								value={password}
								label={"Password"}
							/>
						</div>
						<button
							onClick={variant === "register" ? register : login}
							className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
						>
							{variant === "login" ? "Login" : "Sign Up"}
						</button>
						<div className="flex flex-row items-center gap-4 mt-8 justify-center">
							<div
								onClick={() =>
									signIn("google", {
										callbackUrl: "/profiles",
									})
								}
								className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
							>
								<FcGoogle size={30} />
							</div>
							<div
								onClick={() =>
									signIn("github", {
										callbackUrl: "/profiles",
									})
								}
								className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
							>
								<FaGithub size={30} />
							</div>
						</div>
						<p className="text-neutral-500 mt-12">
							{variant === "login"
								? "First time using Netflix?"
								: "Already have an account?"}
							<span
								className="text-white ml-1 hover:underline cursor-pointer"
								onClick={toggleVariant}
							>
								{variant === "login"
									? "Create Account"
									: "Login"}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Auth;
