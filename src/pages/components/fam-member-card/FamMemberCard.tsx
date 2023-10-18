"use client";

import { Card } from "antd";
import Image from "next/image";
import React from "react";
import missingMemberPic from "../../../../public/assets/missing-member-pic.png";

type FamMemberCardProps = {
  memberName: string;
  img?: string;
};

function FamMemberCard({
  memberName = "some member",
  img,
}: FamMemberCardProps) {
  console.log({ img });
  return (
    <div className="my-4 flex !h-[180px] !w-[180px] flex-col items-center justify-between rounded-md border-slate-300 bg-white p-4 text-center">
      <Image
        src={img || missingMemberPic}
        width={100}
        height={100}
        alt={"img"}
      />
      <p>{memberName}</p>
    </div>
  );
}

export default FamMemberCard;
