import AuthForm from "@/app/components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-500 rounded-3xl p-12 flex flex-col items-center justify-center">
        <h1>Welcome to Photo Store</h1>
        <p>Sign in to upload and save your favourite Photos</p>
        <AuthForm />
      </div>
    </div>
  );
}
