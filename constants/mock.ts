/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type ParentType } from "types";

export const parent: ParentType = {
  name: "Suresh Dakkumalla",
  image: "",
  spouse: "Sowbhagyam Kotapuri",
  spouse_img: "",
  children: [
    { name: "Sundar paul", image: "/sundar_so_suresh.jpg", navigateTo: "" },
    { name: "Sundar paul", image: "/sundar_so_suresh.jpg", navigateTo: "" },
    { name: "Sundar paul", image: "/sundar_so_suresh.jpg", navigateTo: "" },
    { name: "Sundar paul", image: "/sundar_so_suresh.jpg", navigateTo: "" },
    { name: "Sundar paul", image: "/sundar_so_suresh.jpg", navigateTo: "" },
    { name: "Sundar paul", image: "/sundar_so_suresh.jpg", navigateTo: "" },
    { name: "Sundar paul", image: "/sundar_so_suresh.jpg", navigateTo: "" },
    { name: "Sundar paul", image: "/sundar_so_suresh.jpg", navigateTo: "" },
    { name: "Sundar paul", image: "/sundar_so_suresh.jpg", navigateTo: "" },
  ],
};

export const getResponse = (value: any, parent: string) => {
  let pageVal: { parent_name: any; spouse_name: any; children?: any } | null =
    null;

  const childrend: { name: any }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
  value.map((i: any) => {
    if (i.name === parent) {
      value.map((c: any) => {
        if (c.childOf === parent) {
          childrend.push({ name: c.name });
        }
      });

      pageVal = {
        parent_name: i.name,
        spouse_name: i.spouse_name,
        children: childrend,
      };
    }
  });

  return pageVal;
};
