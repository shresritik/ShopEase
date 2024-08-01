type Props = {
  [key: string]: any;
};
/**
 * create html elements
 * @param tag html tagname
 * @param props attributes
 * @param children of the tag
 * @returns HTML Node
 */
export const createElement = (
  tag: string,
  props: Props = {},
  ...children: (HTMLElement | string)[]
) => {
  const element: HTMLElement = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    (element as any)[key] = value;
  });
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
};
