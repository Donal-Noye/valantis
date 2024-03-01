import { md5 } from "js-md5";

const apiUrl = "https://api.valantis.store:41000/";
const password = "Valantis";

function makeAuthorizationString(password: string, timestamp: string) {
  return md5(`${password}_${timestamp}`);
}

export function fetchApi(requestData: any) {
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const authString = makeAuthorizationString(password, currentDate);

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data.result;
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

export function getProductIds(offset: number, limit: number) {
  const requestData = {
    action: "get_ids",
    params: { offset, limit },
  };

  return fetchApi(requestData);
}

export function getProductItems(ids: any) {
  const requestData = {
    action: "get_items",
    params: { ids },
  };

  return fetchApi(requestData);
}

export function getProductFields(field: string, offset: number, limit: number) {
  const requestData = {
    action: "get_fields",
    params: { field, offset, limit },
  };

  return fetchApi(requestData);
}

export function getProductFilterByName(name: string) {
  const requestData = {
    action: "filter",
    params: { name: name },
  };

  return fetchApi(requestData);
}
