import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setloginError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Navigate to the home page
    } catch (error) {
      console.error("Error logging in:", error);
      setloginError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col p-8 gap-4 text-black min-w-80">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 rounded-sm"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 rounded-sm"
      />
      <button
        type="submit"
        className="p-2 rounded-sm bg-green-500 font-semibold text-lg text-white">
        Войти
      </button>
      {loginError && (
        <p className="text-red-500 text-sm">{loginError.message}</p>
      )}
    </form>
  );
};

export default Login;
