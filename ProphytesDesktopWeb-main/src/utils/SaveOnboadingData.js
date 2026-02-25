export const SaveOnboadingData = (newData) => {
  const localStorageKey = "onboading";

  const existingData = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  // Extract key and value from newData
  const [newKey] = Object.keys(newData);
  let newValue = newData[newKey];

  // Convert yearMemberSince to string if it's a number
  if (newKey === "yearMemberSince" && typeof newValue === "number") {
    newValue = newValue.toString();
  }

  // Check if key already exists in any object
  const existingIndex = existingData.findIndex((obj) =>
    obj.hasOwnProperty(newKey)
  );

  if (existingIndex !== -1) {
    // Update existing object
    existingData[existingIndex][newKey] = newValue;
  } else {
    existingData.push({ [newKey]: newValue });
  }

  localStorage.setItem(localStorageKey, JSON.stringify(existingData));
};
