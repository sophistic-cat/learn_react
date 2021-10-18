import React from 'react';
import Excel from 'exceljs';
import { Button } from '@material-ui/core';

export default function UploadButton(props:{
    label: string,
    accept?: string
}){
    const upload = (files:any)=>{
        console.log('uploading...');
        const filesList = files.target.files;
        console.log(filesList[0]);
        
        const fileReader = new FileReader();
        fileReader.onload = (ev) =>{
            const result = ev.target;
            const test:any = [];
            console.log(result?.result);
            const workbook = new Excel.Workbook();
            // workbook.xlsx.read()
            workbook.xlsx.load(result?.result??test).then((res)=>{
                console.log(res);
                res.eachSheet((_sheet, id)=>{
                    console.log('_sheet', _sheet)
                    console.log('id', id);  
                    _sheet.eachRow((row, rowIndex)=>{
                        console.log('row.values:', row.values);
                        console.log('rowIndex:', rowIndex);
                    })
                })
            })
            
        }

        fileReader.readAsBinaryString(filesList[0]);
    }
    return(
        <React.Fragment>
            <input type='file' accept={props.accept ?? '.xlsx, .xls'} onChange={upload} disabled/>
            <Button />
        </React.Fragment>
    )
}