import { Refs } from "./types";

const setActiveParams = (
  refs: Refs["refs"],
  value: number | string | null | undefined
) => {
  for (let i = 0; i < refs.length; i++) {
    (refs[i].ref.current as HTMLDivElement).classList.remove("active");
    if (refs[i].ref?.current && refs[i].value === value) {
      (refs[i].ref.current as HTMLDivElement).classList.add("active");
    }
  }
};

export { setActiveParams };
