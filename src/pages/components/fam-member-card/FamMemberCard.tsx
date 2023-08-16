import { Card } from "antd";
import React from "react";

type FamMemberCardProps = {
  memberName: string;
  img?: string;
};

function FamMemberCard({ memberName = "some member" }: FamMemberCardProps) {
  return <Card>{memberName}</Card>;
}

export default FamMemberCard;
