"use client"
import withAuth from "@/utils/withAuth";

const ProtectedPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="text-4xl">Protected Page</h1>
      <p>Only logged in users can see this page.</p>
    </div>
  );
};

export default withAuth(ProtectedPage);
