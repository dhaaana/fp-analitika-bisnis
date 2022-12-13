import DiagnosisForm from "../components/diagnosis-form";

// async function getDiagnosis() {
//   const coba = await fetch("http://127.0.0.1:8000/path");
//   return await coba.json();
// }
export default async function Home() {
  return (
    <main className="w-screen h-screen bg-indigo-100 flex sm:px-0 px-3 justify-center flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">
        Final Project Analitika Bisnis
      </h1>
      <DiagnosisForm />
    </main>
  );
}
