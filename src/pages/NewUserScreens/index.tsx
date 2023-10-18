/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Button } from "antd";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D3CCE3] to-[#E9E4F0]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
          DO YOU HAVE A EXISITING FAMLIY TREE
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex">
            <button className="!hover:border-black flex items-center rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20">
              YES
            </button>
            <Link
              href="/user-dashbaord"
              className="flex items-center rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
            >
              No
            </Link>
          </div>
          {/* <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p> */}
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
};

export default page;

function AuthShowcase() {
  const { data: sessionData } = useSession();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const { data: secretMessage } = api.famMembers.getParent.useQuery("");

  console.log({ secretMessage });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {/* {secretMessage && <span> - {secretMessage}</span>} */}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
