import Week from "./week"

export default function Calendar({startDate, deadlines}: {startDate: Date, deadlines: any}){
  const numWeeks = 12
  const rows = []
  for (var i = 0; i < numWeeks; i++){
    const dateOfWeek = new Date(startDate.getTime() + 7*24*60*60*1000 * i)
    rows.push(
      <div key={i}>
        <div>week {i+1} - begining {(dateOfWeek.getMonth() + 1).toString()}/{dateOfWeek.getDate().toString()}</div>
      </div>
    )
    rows.push(
      <Week startOfWeek={dateOfWeek} key={i} deadlines={deadlines}></Week>
    )
    
  }
      
  return <div className="calendar w-full table-fixed">
      {rows}
  </div>
}