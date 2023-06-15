import RGBtoHex from "./RGBtoHex";

export default function SetColorFields(r, g, b, alpha = 1) {
  const hex = document.getElementById("colorPickerInputHex");
  const rgbr = document.getElementById("colorPickerInputR");
  const rgbg = document.getElementById("colorPickerInputG");
  const rgbb = document.getElementById("colorPickerInputB");
  const rgba = document.getElementById("colorPickerInputA");

  rgbr.value = r;
  rgbg.value = g;
  rgbb.value = b;
  rgba.value = alpha;

  hex.value = RGBtoHex(r, g, b);
}
