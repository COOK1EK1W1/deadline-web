import { useState } from "react"
import DateIco from "./date"

export default function modal({deadlines, today} : {deadlines: (Deadline | undefined)[], today:Date}){
  const [formData, setFormData] = useState<Deadline>({
    name: '',
    subject: '',
    due: '',
    start: '',
    mark: 0,
    room: '',
    url: '',
    info: '',
  });

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/deadlines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

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
  return <div className="m-2" onClick={(e)=>{e.stopPropagation()}}>
    <DateIco date={today} showDay={false}/>
    <div className="h-[53vh] overflow-y-auto">
      {deadlineRows}
      {(deadlineRows.length == 0) && (
      <div>no deadlines 
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded px-4">create new</button>
        <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="datetime-local"
          id="start"
          name="start"
          value={formData.start}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="datetime-local"
          id="due"
          name="due"
          value={formData.due}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="mark">Mark</label>
        <input
          type="number"
          id="mark"
          name="mark"
          value={formData.mark}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="info">Info</label>
        <textarea
          id="info"
          name="info"
          value={formData.info}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
      </div>)}
    </div>
    
  </div>

}