const handleGetLocationData = (data: any[] | null) => () => {
  if (data) {
    return data.reduce((previousValue, currentValue) => {
      previousValue.push({
        title: currentValue.name,
        value: currentValue.name,
        key: currentValue.id,
        children: [],
      });

      for (let i = 0; i < currentValue.cities.length; i++) {
        previousValue[previousValue.length - 1].children.push({
          title: currentValue.cities[i].name,
          value: currentValue.cities[i].id,
          key: currentValue.cities[i].id,
          children: [],
        });

        for (let j = 0; j < currentValue.cities[i].metroLines.length; j++) {
          previousValue[previousValue.length - 1].children[i].children.push({
            title: currentValue.cities[i].metroLines[j].name,
            value: currentValue.cities[i].metroLines[j].name,
            key: currentValue.cities[i].metroLines[j].id,
            children: [],
          });

          for (
            let q = 0;
            q < currentValue.cities[i].metroLines[j].metros.length;
            q++
          ) {
            previousValue[previousValue.length - 1].children[i].children[
              j
            ].children.push({
              title: currentValue.cities[i].metroLines[j].metros[q].name,
              value: currentValue.cities[i].metroLines[j].metros[q].name,
              key: currentValue.cities[i].metroLines[j].metros[q].id,
            });
          }
        }
      }

      return previousValue;
    }, []);
  }
};

export { handleGetLocationData };
