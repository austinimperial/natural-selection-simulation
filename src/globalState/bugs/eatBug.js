export default function eatBug(i, setBugs) {
  setBugs((prevBugs) => {
    const newBugs = [...prevBugs];
    newBugs.splice(i, 1);
    return newBugs;
  });
}
