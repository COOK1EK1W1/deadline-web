type DBResponse = {
  command: string;
  fields: [{
    columnID: number;
    dataTypeID: number;
    dataTypeModifier: number;
    dataTypeSize: number;
    format: string;
    name: string;
    tableID: number
  }];
  rowsAsArray: boolean;
  rowCount: number;
  rows: [{
    name: string;
    subject: string;
    start: string;
    due: string;
    mark: number;
    room: string;
    url: string;
    info: string;
  }]

}

type Deadline = {
    name: string;
    subject: string;
    start: string;
    due: string;
    mark: number;
    room: string;
    url: string;
    info: string;
}