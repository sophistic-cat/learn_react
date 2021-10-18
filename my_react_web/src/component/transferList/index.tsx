import { Checkbox, Grid, List, ListItem, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useImperativeHandle, useState } from "react";
import { Button } from "../button";

const useStyles = makeStyles({
    buttonFormat: {
        color: 'red', 
        background: '#94BAF3'
    },
    paperFormat: {
        width: '100%',
        height: 230,
        overflow: 'auto'
    }
})

export type transferListRef = {

}

export type transferList = {
    label: string,
    value: string,
    disabled?: boolean | false
}

export type transferListProps = {
    leftList: Array<transferList>,
    rightList: Array<transferList>,
}

const not = (a:Array<transferList>, b:Array<transferList>) => {
    console.log('this is not');
    return a.filter((value)=> b.indexOf(value) ===-1);
}

const intersection = (a:Array<transferList>, b:Array<transferList>) => {
    console.log('this is inter');
    return a.filter((value)=> b.indexOf(value) !==-1);
}

const testConsole = () => {
    console.log('test...');
}

export const TransferList = React.forwardRef<transferListRef, transferListProps>((props:transferListProps, ref:React.ForwardedRef<transferListRef>)=>{
    const classes = useStyles();
    const { leftList, rightList, ...others } = props;

    const disabledList = rightList.reduce((pre, item, index)=>{
        if(item.disabled === true){
            pre.push({
                label: item.label,
                value: item.value,
                disabled: item.disabled
            })
        }
        return pre;
    }, Array<transferList>());

    const selectList = rightList.reduce((pre, item, index)=> {
        if(item.disabled !== true){
            pre.push({
                label: item.label,
                value: item.value,
                disabled: item.disabled
            })
        }
        return pre;
    }, Array<transferList>());

    const [checked,setChecked] = useState<Array<transferList>>([]);
    const [leftMenu, setLeftMenu] = useState(leftList);
    const [rightMenu, setRightMenu] = useState(disabledList.concat(selectList));

    const leftChecked = intersection(checked, leftMenu);
    const rightChecked = intersection(checked, rightMenu);

    const test = testConsole();

    const handleToggle = (value:transferList) => ()  => {
        console.log('value:', value);

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if(currentIndex === -1){
            newChecked.push(value);
        }else{
            newChecked.splice(currentIndex, 1);
        }   

        console.log('newChecked:', newChecked);
        setChecked(newChecked);
    }

    const handleAllRight = () => {
        setRightMenu(disabledList);
        setLeftMenu(leftMenu.concat(selectList));
        setChecked([]);
    }

    const handleAllLeft = () => {
        setLeftMenu([]);
        setRightMenu(rightMenu.concat(leftMenu));
        setChecked([]);
    }

    const handleCheckedLeft = () => {
        setRightMenu(rightMenu.concat(leftChecked));
        setLeftMenu(not(leftMenu, leftChecked));
        setChecked(not(checked, leftChecked));    
    }

    const handleCheckedRight = () => {
        setLeftMenu(leftMenu.concat(rightChecked));
        setRightMenu(not(rightMenu, rightChecked));
        setChecked(not(checked, rightChecked))
    }

    useImperativeHandle(ref, ()=>{
        return{

        }
    }, [ref])

    const customList = (items:Array<transferList>) => (
        <Paper className={classes.paperFormat}>
            <List role='list' >
                {items.map((item, index)=>{
                    return(
                        <ListItem
                            key={index}
                            button
                            disabled={item.disabled}
                            onClick={handleToggle(item)}
                            >
                            <Checkbox key={index} checked={item.disabled ? true : checked.indexOf(item)!==-1} />
                            {item.label}
                        </ListItem>   
                    )
            })}
            </List>
        </Paper>
    )

    return(
        <>
            <Grid container>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    {customList(leftMenu)}
                </Grid>
                <Grid item container xs={12} sm={12} md={5} lg={2} direction='column' alignItems='center' justifyContent='center'>
                    <Button label='>>' className={classes.buttonFormat} onClick={handleAllLeft}/>
                    <Button label='>' className={classes.buttonFormat} onClick={handleCheckedLeft}/>
                    <Button label='<' className={classes.buttonFormat} onClick={handleCheckedRight}/>
                    <Button label='<<' className={classes.buttonFormat} onClick={handleAllRight}/>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    {customList(rightMenu)}
                </Grid>
            </Grid>
        </>
    )
})