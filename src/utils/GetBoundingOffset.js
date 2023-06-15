export default function GetBoundingOffset(e, element, dir) {
  const container = element.getBoundingClientRect();

  if (dir === "left") {
    let left = (Math.floor(e.clientX - container.left) / container.width) * 100;

    return left < 0 ? 0 : left > 100 ? 100 : left;
  }

  if (dir === "top") {
    let top = (Math.floor(e.clientY - container.top) / container.height) * 100;

    return top < 0 ? 0 : top > 100 ? 100 : top;
  }

  return 0;
}
