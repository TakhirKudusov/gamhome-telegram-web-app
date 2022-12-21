import { HandleChangeActiveClick } from "./types";

class FormHelper {
  static handleChangeActiveClick: HandleChangeActiveClick =
    (ref, arr) => () => {
      for (let i = 0; i < arr.length; i++) {
        (arr[i].ref.current as unknown as HTMLDivElement).classList.remove(
          "active"
        );
      }
      (ref.current as unknown as HTMLDivElement).classList.add("active");
    };
}

export default FormHelper;
