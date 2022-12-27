import { userData } from "./types";

const handleGetLocationData = (data: any[] | null) => () => {
  if (data) {
    return data.reduce((previousValue, currentValue, currentIndex) => {
      previousValue.push({
        title: currentValue.name,
        value: `${currentValue.name}/${currentValue.id}/1`,
        children: [],
      });

      for (let i = 0; i < currentValue.cities.length; i++) {
        previousValue[previousValue.length - 1].children.push({
          title: currentValue.cities[i].name,
          value: `${currentValue.cities[i].name}/${currentValue.cities[i].id}/2`,
          children: [],
        });

        // for (let j = 0; j < currentValue.cities[i].metroLines.length; j++) {
        //   previousValue[previousValue.length - 1].children[i].children.push({
        //     title: currentValue.cities[i].metroLines[j].name,
        //     value: `${currentValue.cities[i].metroLines[j].name}/${currentValue.cities[i].metroLines[j].id}/3`,
        //     children: [],
        //   });
        //
        //   for (
        //     let q = 0;
        //     q < currentValue.cities[i].metroLines[j].metros.length;
        //     q++
        //   ) {
        //     previousValue[previousValue.length - 1].children[i].children[
        //       j
        //     ].children.push({
        //       title: currentValue.cities[i].metroLines[j].metros[q].name,
        //       value: `${currentValue.cities[i].metroLines[j].metros[q].name}/${currentValue.cities[i].metroLines[j].metros[q].id}/4`,
        //     });
        //   }
        // }
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

export { handleGetLocationData, handleFormSubmit };
