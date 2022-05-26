import * as XLSX from 'xlsx';

/**
 * 获取excel的表头(有数据的第一行)
 * @param sheet
 * @returns string[]
 */
export function getExcelHeadBySheet (sheet:XLSX.WorkSheet):string[] {
  const headers:string[] = [];
  // 判断sheet表是否有数据
  if (Object.prototype.hasOwnProperty.call(sheet, '!ref')) {
    const range = XLSX.utils.decode_range(sheet['!ref'] as string);
    // console.log('rowStart:', range.s.c, range.e.c);
    const rowStart = range.s.r;
    // const rowEnd = range.e.r;
    // const colStart = range.s.c;
    const colEnd = range.e.c;
    for (let c = 0; c <= colEnd; c++) {
      const cell = sheet[XLSX.utils.encode_cell({ c: c, r: rowStart })];
      console.log('cell:', cell);
      if (cell) {
        headers.push(cell.v);
      }
    }
  }

  return headers;
}

/**
 * excel解析成json(只读取第一张sheet表)
 * @param files
 * @returns Promise
 */
export function parseExcelToJSON (files:any) {
  const promiseObj = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const { result } = event.target as FileReader;
        const workbook = XLSX.read(result, { type: 'binary' });
        let tableBody:string[] = [];
        let tableHead:string[] = [];
        const data = [];
        if (workbook.SheetNames.length !== 0) {
          // 获取第一张sheet表
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          // 判断sheet表是否有数据
          if (Object.prototype.hasOwnProperty.call(sheet, '!ref')) {
            // 利用 sheet_to_json 方法将 excel 转成JSON对象
            tableBody = XLSX.utils.sheet_to_json(sheet);
            tableHead = getExcelHeadBySheet(sheet);
            data.push({ tableHead: tableHead });
            data.push({ tableBody: tableBody });
          }
        }
        resolve(data);
      } catch (e) {
        reject(e);
      }
    };
    fileReader.readAsBinaryString(files[0]);
  });
  return promiseObj;
}

export function getSpecialColFromSheet (sheet:XLSX.WorkSheet, colNum: number) {
  console.log('SHEET---', sheet);
  const colData:string[] = [];
  // 判断sheet表是否有数据
  if (Object.prototype.hasOwnProperty.call(sheet, '!ref')) {
    const range = XLSX.utils.decode_range(sheet['!ref'] as string);
    console.log('colStart-End:', range, range.s.c, range.e.c);
    const rowStart = range.s.r;
    // const rowEnd = range.e.r;
    // const colStart = range.s.c;
    const colEnd = range.e.c;
    for (let c = 0; c <= colEnd; c++) {
      const cell = sheet[XLSX.utils.encode_cell({ c: c, r: rowStart })];
      // console.log('cell:', cell);
      const list = cell.v.split('  ');
      console.log('List:', list);
      if (cell) {
        colData.push(cell.v);
      }
    }
  }
}

/**
 * @summary 获取excel所有sheet里某一列
 * @param files
 * @param colNum
 */
export function getAllSheetsSpecialCol (files: any, colNum: number) {
  const fileReader = new FileReader();
  fileReader.onload = e => {
    const { result } = e.target as FileReader;
    const workbook = XLSX.read(result, { type: 'binary' });
    if (workbook.SheetNames && workbook.SheetNames.length > 0) {
      // 遍历sheet
      for (const item of workbook.SheetNames) {
        const col = getSpecialColFromSheet(workbook.Sheets[workbook.SheetNames[0]], colNum);
      }
    }
  };
  fileReader.readAsBinaryString(files);
}

// -------------------- Test ------------------------ //

const getColListFromSheet = (sheet:XLSX.WorkSheet) => {
  const colData:string[] = [];
  // 判断sheet表是否有数据
  if (Object.prototype.hasOwnProperty.call(sheet, '!ref')) {
    const range = XLSX.utils.decode_range(sheet['!ref'] as string);
    // console.log('colStart-End:', range, range.s.c, range.e.c);
    const rowStart = range.s.r;
    const rowEnd = range.e.r;
    // const colStart = range.s.c;
    const colEnd = range.e.c;
    for (let c = 0; c <= rowEnd; c++) {
      const cell = sheet[XLSX.utils.encode_cell({ c: 0, r: c })];
      // console.log('cell:', cell);
      const list:string[] = cell && cell?.v && (cell.v.split(' ') as string[]).reduce((pre, item) => {
        item && pre.push(item);
        return pre;
      }, new Array<string>());

      // console.log(c, 'COL_LIST', list);

      if (list) {
        const index = list.findIndex((item) => item === 'ug/l' || item === 'ug/ml');
        index !== -1 && colData.push(`${list[index - 1]} ${list[index]}`);
      }
    }
  }

  return colData;
};

const writeDataToNewExcel = (data: {[index:string]: string[]}) => {
  const workbook = XLSX.utils.book_new();
  for (const item of Object.getOwnPropertyNames(data)) {
    const sheet = XLSX.utils.aoa_to_sheet(data[item].reduce((pre, item, index) => {
      index === 0 && pre.push(['Conc.']);
      pre.push([item]);
      return pre;
    }, new Array<string[]>()));
    XLSX.utils.book_append_sheet(workbook, sheet, item);
  }
  XLSX.writeFile(workbook, 'test.xlsx', { bookType: 'xlsx' });
};

export function getSpecialColDataExcel (files:any) {
  const fileReader = new FileReader();
  fileReader.onload = e => {
    const { result } = e.target as FileReader;
    // console.log(result);
    const workbook = XLSX.read(result, { type: 'binary' });
    if (workbook.SheetNames && workbook.SheetNames.length > 0) {
      const excelData: { [index:string]: string[] } = {};
      // 遍历sheet
      for (const item of workbook.SheetNames) {
        const colList = getColListFromSheet(workbook.Sheets[item]);
        excelData[item] = colList;
      }
      console.log(excelData);
      writeDataToNewExcel(excelData);
    }
  };
  fileReader.readAsBinaryString(files);
}
