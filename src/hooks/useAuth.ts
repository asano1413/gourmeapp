import { useSession } from "next-auth/react";

const useAuth = () => {
  const { data: session, status, update } = useSession();
  return { user: session?.user, status, update };
}

export default useAuth;
