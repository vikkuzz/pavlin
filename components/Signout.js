import { useAuth } from "../AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return null; // Don't display the sign out button if the user is not logged in
  }

  return (
    <button
      onClick={handleSignOut}
      className="p-2 rounded-sm bg-red-500 hover:bg-red-600 font-semibold text-white leading-6">
      Выйти
    </button>
  );
};

export default SignOut;
