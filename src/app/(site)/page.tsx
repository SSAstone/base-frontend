import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Hello World </h1>
      <Image src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-fbca2.appspot.com/o/images%2F1711399380228?alt=media&token=3a47caf0-583e-4a7f-b733-26afbd63e2cc" alt="Vercel Logo" width={72} height={16}></Image>
    </main>
  );
}
