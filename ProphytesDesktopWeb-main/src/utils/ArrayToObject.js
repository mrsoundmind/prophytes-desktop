export const ArrayToObject = (array) => {
    if (!array.length) {
      return {};
    }

    const obj = {};
    array.forEach((data) => {
      const key = Object.keys(data)[0];
      obj[key] = Object.values(data)[0];
    });

    return obj;
};