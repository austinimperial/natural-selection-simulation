export default function addBug(e,setBugs) {
    e.persist()
    setBugs(prevBugs => ([
        ...prevBugs,
        {
            x:e.pageX - e.target.offsetLeft, 
            y:e.pageY - e.target.offsetTop
        }
    ]))        
}