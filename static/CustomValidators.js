export function isNotJoe(value) {
  if (!value) return true;
  return !value.includes("Joe");
}

export function notGmail(value = "") {
  return !value || !value.includes("gmail");
}

export function isEmailAvailable(value) {
  if (value === "") return true;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value.length > 10);
    }, 500);
  });
}

export function isNameJoe(value) {
  return value === "Joe";
}


export function illegalChars(value) {
  const charsList = ["#", "&", "$", "~"];
  const regex = `[${charsList.join(",")}]`;
  const regexExp = new RegExp(regex);
  return !regexExp.test(value);
}
