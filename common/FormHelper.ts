import { HandleChangeActiveClick } from "./types";
import { setPrimitiveField } from "../redux/slicers/formDataSlicer";

class FormHelper {
  static handleChangeActiveClick: HandleChangeActiveClick =
    (ref, obj, dispatch) => () => {
      for (let i = 0; i < obj.refs.length; i++) {
        (obj.refs[i].ref.current as unknown as HTMLDivElement).classList.remove(
          "active"
        );
      }
      dispatch(setPrimitiveField({ name: obj.type, value: ref.value }));
      (ref.ref.current as unknown as HTMLDivElement).classList.add("active");
    };
}

export default FormHelper;
