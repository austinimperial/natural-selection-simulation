// the just-eaten bug gets put at the back of the bugs array.
export default function eatBug(i, setBugs) {
  setBugs((prevBugs) => {
    const newBugs = [...prevBugs];
    const eatenBug = newBugs.splice(i, 1);
    newBugs.push(eatenBug[0]);
    return newBugs;
  });
}
