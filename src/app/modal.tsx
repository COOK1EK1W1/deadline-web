"use client"

import DateIco from "./date"

export default function modal({deadlines, today} : {deadlines: (Deadline | undefined)[], today:Date}){
  const days = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"]
  const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const deadlineRows = []
  for (let i = 0; i < deadlines.length; i++){
    const cur = deadlines[i]
    if (cur !== undefined){
    deadlineRows.push(
      <div className=" p-2 glass mb-2" key={i}>

        <span className="text-2xl">{cur.name}</span>
        <span className="w-4 inline-block"></span>
        <span>{cur.subject}</span>
        <div>
          <p>starts:</p>
          <p>{new Date(cur.start).toLocaleDateString()} at {new Date(cur.start).toLocaleTimeString()}</p>
        </div>
        <p>due: {cur.due}</p>
        <p>{new Date(cur.start).toLocaleTimeString("eu-US")}</p>
        </div>
        
    )

    }
    
  }
  return <div className="m-2">
    <DateIco date={today} showDay={false}/>
    {deadlineRows}
    {(deadlineRows.length == 0) && (<div>no deadlines</div>)}
  </div>

}