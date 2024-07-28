import axios from "axios";
import { BASE_URL } from "../constants";

export const esewaCall = (formData: any) => {
  console.log(formData);
  var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

  var form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", path);

  for (var key in formData) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", formData[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
};
export const successEsewa = async (query: string) => {
  return await axios.get(BASE_URL + `/api/orders/success?data=${query}`);
};
