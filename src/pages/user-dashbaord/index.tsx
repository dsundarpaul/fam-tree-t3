/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useState } from "react";
// import { useSession } from "next-auth/react";
import { Button } from "antd";
// import { api } from "~/utils/api";

import AddMemberForm from "../components/add-member-form/AddMemberForm";
import FamMemberCard from "../components/fam-member-card/FamMemberCard";
// import { parent } from "constants/mock";
import type {
  FamMemberFromValuesType,
  FamliyObjectType,
  childType,
} from "types";
import { getResponse } from "constants/mock";
// import { famMemberRouter } from "~/server/api/routers/fam-members";

const UserDashboard = () => {
  const [addMemberModalVisible, setAddMemberModalVisible] =
    useState<boolean>(false);

  const [mockDB, setMockDB] = useState<FamMemberFromValuesType[]>([]);
  const [fam, setFam] = useState<FamliyObjectType | null>(null);

  const handleOpenAddMemberModal = () => setAddMemberModalVisible(true);

  const hanldeOnClickNavigation = (_: any) => null;

  const handleAddFamMember = (values: FamMemberFromValuesType) => {
    const mockPayload = values;

    if (mockDB.length < 1) {
      mockPayload.childOf = null;
    } else {
      mockPayload.childOf = "suresh";
    }

    setMockDB((prev) => [...prev, mockPayload]);

    getResponse(mockDB, "22");

    console.log({ fam, mockDB });
    console.log({ values });

    setAddMemberModalVisible(false);
  };

  const renderParents = () => (
    <div className="flex w-full items-center justify-evenly">
      <div>
        {fam?.parent_name ? (
          <FamMemberCard
            memberName={fam?.parent_name}
            img={fam?.parent_image}
          />
        ) : (
          fam?.parent_name
        )}
      </div>
      <div className="memberAvatar parents">
        {fam?.spouse_name ? (
          <FamMemberCard memberName={fam.spouse_name} img={fam.spouse_image} />
        ) : (
          <Button
            type="dashed"
            className="h-36 w-36 border-black"
            onClick={handleOpenAddMemberModal}
          >
            Add Memeber
          </Button>
        )}
      </div>
    </div>
  );

  const renderChildren = () => (
    <div className="children mt-20 flex w-full flex-wrap items-center justify-around ">
      {fam?.children && (
        <>
          {fam?.children?.map((child: childType, idx: number) => {
            return (
              <div
                className="memberAvatar child"
                key={idx}
                onClick={() => hanldeOnClickNavigation(child.navigateTo)}
              >
                {child && (
                  <FamMemberCard memberName={child.name} img={child.image} />
                )}
              </div>
            );
          })}
        </>
      )}
      <Button
        type="dashed"
        className="h-36 w-36 border-black"
        onClick={handleOpenAddMemberModal}
      >
        Add Memeber
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D3CCE3] to-[#E9E4F0]">
      {fam ? (
        <>
          <div>{fam.parent_name} Famliy</div>

          {renderParents()}

          {renderChildren()}
        </>
      ) : (
        <Button
          type="dashed"
          className="h-36 w-36 border-black"
          onClick={() => handleOpenAddMemberModal()}
        >
          Add Memeber
        </Button>
      )}

      <AddMemberForm
        addMemberModalVisible={addMemberModalVisible}
        setAddMemberModalVisible={setAddMemberModalVisible}
        handleAddFamMember={(values: FamMemberFromValuesType) =>
          handleAddFamMember(values)
        }
      />
    </div>
  );
};

export default UserDashboard;
