import React, { useImperativeHandle } from "react";
import Excel from 'exceljs';
import { Button as BaseButton, ButtonProps as BaseButtonProps, Icon } from "@material-ui/core";

export type ButtonProps = BaseButtonProps & {
    label: string,
    component?: string
}

export function Button(props:ButtonProps){
    const { label, ...others} = props
    return(
        <>
            <BaseButton { ...others } style={{margin: '0.1rem'}}>{props.label}</BaseButton>
        </>   
    )
}

export type UploadButtonProps = BaseButtonProps & {
    label: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    accept?: string,
    multiple?: boolean
}

export function UploadButton(props:UploadButtonProps){
    const { label, onChange, accept='.xlsx, .xls', ...others} = props;
    const id = 'files_upload_button';
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
            <input id={id} type='file' accept={accept} style={{display: 'none'}}
                onClick={(event)=>{}}
                onChange={onChange} />
            <label htmlFor={id}>
                <Button label={label} component='span' startIcon={<Icon>upload</Icon>}/>
            </label>
            {/* <Button label={label}  onClick={()=>{document.getElementById(label)?.click();}} /> */}
        </React.Fragment>
    )
}

export type UseRefExampleProps = {
    value: string
}

export type UseRefExampleRef = {
    disable: string
}

export const UseRefExample = React.forwardRef<UseRefExampleRef, UseRefExampleProps>((props: UseRefExampleProps, ref: React.ForwardedRef<UseRefExampleRef>)=>{
    const { value,...others } = props;
    useImperativeHandle(ref, ()=>{
        return{
            disable: '111'
        }
    })

    return(
        <></>
    )
})