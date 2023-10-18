import { type UploadFile } from "antd";

export type childType = {
  name: string;
  image: string;
  navigateTo?: string;
};

export type ParentType = {
  name: string;
  spouse: string;
  spouse_img: string;
  image: string;
  children?: childType[];
};

export interface FamliyObjectType {
  parent_name?: string;
  parent_image?: string;
  spouse_name?: string;
  spouse_image?: string;
  children?: childType[];
}

export type GenderConstType = "M" | "F" | "O";

export interface FamMemberFromValuesType {
  name: string;
  gender: GenderConstType;
  image: UploadFile | string;
  childOf?: string | null;
}
