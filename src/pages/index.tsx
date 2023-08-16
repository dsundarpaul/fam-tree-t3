import Head from "next/head";
// import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/router";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const router = useRouter();

  const handleGetStarted = () => router.push("/NewUserScreens");

  return (
    <>
      <Head>
        <title>Family Tree</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* bg-gradient-to-b from-[#2e026d] to-[#15162c] --default */}
      {/* bg-gradient-to-b from-[#D3CCE3] to-[#E9E4F0] --grey */}
      {/* bg-gradient-to-b from-[#6190E8] to-[#A7BFE8] --blue */}
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D3CCE3] to-[#E9E4F0] ">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
            Visualize Your <span className="text-pink-500">Family Tree</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            {/* <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p> */}

            <Button
              className="h-12 w-40 text-xl text-black"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
