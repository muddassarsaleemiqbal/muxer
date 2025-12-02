import { requireAuth } from "@/lib/auth-guards";

const page = async () => {
  const session = await requireAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
};

export default page;
