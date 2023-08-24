import Week from "./week"

export default function Calendar({startDate}: {startDate: Date}){
  const numWeeks = 12
  const rows = []
  for (var i = 0; i < numWeeks; i++){
    const dateOfWeek = new Date(startDate.getTime() + 7*24*60*60*1000 * i)
    rows.push(
      <div>
        <div>week {i+1} - begining {(dateOfWeek.getMonth() + 1).toString()}/{dateOfWeek.getDate().toString()}</div>
      </div>
    )
    rows.push(
      <Week startOfWeek={dateOfWeek}></Week>
    )
    
  }
      
  return <div className="calendar w-full table-fixed">
      {rows}
  </div>
}