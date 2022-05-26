import React, { useImperativeHandle } from 'react';
import Excel from 'exceljs';
import { Button as BaseButton, ButtonProps as BaseButtonProps, Icon } from '@material-ui/core';

export type ButtonProps = BaseButtonProps & {
    label: string,
    component?: string
}

export function Button (props:ButtonProps) {
  const { label, ...others } = props;
  return (
        <>
            <BaseButton { ...others } style={{ margin: '0.1rem' }}>{props.label}</BaseButton>
        </>
  );
}

export type UploadButtonProps = BaseButtonProps & {
    label: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    accept?: string,
    multiple?: boolean
}

export function UploadButton (props:UploadButtonProps) {
  const { label, onChange, accept = '.xlsx, .xls', ...others } = props;
  const ref = React.useRef<HTMLInputElement>();
  const id = 'files_upload_button';
  return (
        <React.Fragment>
            <input id={id} type='file' accept={accept} style={{ display: 'none' }}
                ref={ref as any}
                onClick={(event) => { (event.target as any).value = null; }}
                onChange={onChange} />
            <label >
                <Button label={label} component='span' startIcon={<Icon>cloud_upload</Icon>} onClick={() => ref?.current?.click()}/>
            </label>
            {/* <Button label={label} onClick={() => { document.getElementById(label)?.click(); }} /> */}
        </React.Fragment>
  );
}

export type UseRefExampleProps = {
    value: string
}

export type UseRefExampleRef = {
    disable: string
}

export const UseRefExample = React.forwardRef<UseRefExampleRef, UseRefExampleProps>((props: UseRefExampleProps, ref: React.ForwardedRef<UseRefExampleRef>) => {
  const { value, ...others } = props;
  useImperativeHandle(ref, () => {
    return {
      disable: '111'
    };
  });

  return (
        <></>
  );
});
