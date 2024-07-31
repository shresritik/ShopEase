import axios from "axios";
import { BASE_URL } from "../constants";
import { getToken } from "../utils/auth";

export const esewaCall = (formData: any) => {
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
  const token = getToken("accessToken");

  const data = await axios.post(
    BASE_URL + `/api/orders/success`,
    {
      data: query,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
