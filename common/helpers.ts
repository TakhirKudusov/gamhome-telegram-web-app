import { Refs, userData } from "./types";
import { Dispatch, SetStateAction } from "react";

const handleFormatData =
  (data: any[] | null, key: "cities" | "metros") => () => {
    if (data) {
      return data.reduce((previousValue, currentValue) => {
        previousValue.push({
          title: currentValue.name,
          value: `${currentValue.name}/${currentValue.id}`,
          children: [],
          selectable: false,
        });

        for (let i = 0; i < currentValue[key].length; i++) {
          previousValue[previousValue.length - 1].children.push({
            title: currentValue[key][i].name,
            value: `${currentValue[key][i].name}/${currentValue[key][i].id}/1`,
          });
        }
        return previousValue;
      }, []);
    }
  };

const handleFormSubmit = (form: userData) => {
  console.log(form);
  // form.city = [];
  // form.metros = [];
  // for (let i = 0; i < form.location.length; i++) {
  //   const el = form.location[i].split("/");
  //   console.log(el);
  //   if (el[3] === "1") {
  //   }
  // }
};

const handleFormatDistrictsData = (data: any[]) => {
  return data.reduce((previousValue, currentValue) => {
    previousValue.push({
      title: currentValue.name,
      value: currentValue.name,
    });
    return previousValue;
  }, []);
};

const handleFormatMetrosData = (data: any[]) => {
  return handleFormatData(data, "metros")();
};

const handleGetData =
  (
    citiesData: any[] | null,
    currCity: string | null | undefined,
    setDisabled: Dispatch<SetStateAction<boolean>>,
    key: "districts" | "metroLines",
    dataHandler: (data: any[]) => any[]
  ) =>
  () => {
    if (citiesData) {
      let city;
      for (let i = 0; i < citiesData.length; i++) {
        const tempCity = citiesData[i].cities.find(
          (el: any) => el.name === currCity?.split("/")[0]
        );
        if (tempCity) {
          city = tempCity;
          break;
        }
      }
      if (city?.[key] && city[key].length !== 0) {
        setDisabled(false);
        return dataHandler(city[key]);
      }
      setDisabled(true);
    }
    return [];
  };

const setActiveParams = (
  refs: Refs["refs"],
  value: number | null | undefined
) => {
  for (let i = 0; i < refs.length; i++) {
    (refs[i].ref.current as HTMLDivElement).classList.remove("active");
    if (refs[i].ref?.current && refs[i].value === value) {
      (refs[i].ref.current as HTMLDivElement).classList.add("active");
    }
  }
};

export {
  handleFormSubmit,
  handleGetData,
  handleFormatDistrictsData,
  handleFormatMetrosData,
  handleFormatData,
  setActiveParams,
};
