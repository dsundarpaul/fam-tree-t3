/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "antd";
import AddMemberForm from "../components/add-member-form/AddMemberForm";
import { api } from "~/utils/api";
import FamMemberCard from "../components/fam-member-card/FamMemberCard";

const UserDashboard = () => {
  const [addMemberModalVisible, setAddMemberModalVisible] =
    useState<boolean>(false);

  const { data } = api.famMembers.getAll.useQuery();

  const parent = {
    name: "suresh",
    spouse: "sow",
  };

  console.log(data);

  const handleOpenAddMemberModal = () => setAddMemberModalVisible(true);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D3CCE3] to-[#E9E4F0]">
      {parent ? (
        <>
          <div>{parent.name} Famliy</div>
          <div className="flex w-full justify-evenly">
            <div className="memberAvatar parents">
              {parent.name ? (
                <FamMemberCard memberName={parent.name} img={parent.image} />
              ) : (
                parent.name
              )}
            </div>
            <div className="memberAvatar parents">
              {parent.name ? (
                <FamMemberCard
                  memberName={parent.spouse}
                  img={parent.spouse_img}
                />
              ) : (
                parent.spouse
              )}
            </div>
          </div>
          <div className="children">
            {parent.children ? (
              <>
                {parent?.children?.map((child, idx) => {
                  return (
                    <div
                      className="memberAvatar child"
                      key={idx}
                      onClick={() => hanldeOnClickNavigation(child.navigateTo)}
                    >
                      {child.image ? (
                        <FamMemberCard memberName="" img={child.image} />
                      ) : (
                        child.name
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <Button
                  type="dashed"
                  className="h-36 w-36 border-black"
                  onClick={handleOpenAddMemberModal}
                >
                  Add Memeber
                </Button>
              </>
            )}
          </div>
        </>
      ) : (
        <Button
          type="dashed"
          className="h-36 w-36 border-black"
          onClick={handleOpenAddMemberModal}
        >
          Add Memeber
        </Button>
      )}

      <AddMemberForm
        addMemberModalVisible={addMemberModalVisible}
        setAddMemberModalVisible={setAddMemberModalVisible}
      />
    </div>
  );
};

export default UserDashboard;
