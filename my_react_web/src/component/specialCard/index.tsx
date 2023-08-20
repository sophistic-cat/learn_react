import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles({
  root: {
    width: '100%', display: 'flex', flexDirection: 'column'
  },
  rightButtonRoot: {
    display: 'inline-flex', justifyContent: 'space-between', width: '100%'
  },
  rightButtonPlaceHolderBox: {
    width: '100%',
    height: 'auto',
    border: '1px solid rgb(205, 210, 219)',
    borderRadius: '0.375rem 0 0 0',
    borderWidth: '1px 0 0 1px'
  },
  rightButtonBox: {
    width: '1.6rem',
    height: '1.5rem',
    border: '1px solid rgb(205, 210, 219)',
    borderRadius: '0 0.375rem 0.375rem 0',
    borderWidth: '1px 1px 1px 0',
    display: 'inline-flex',
    justifyContent: 'center'
  },
  bodyRoot: {
    display: 'inline-flex', justifyContent: 'space-between', width: '100%'
  },
  bodyBox: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '10rem',
    border: '1px solid rgb(205, 210, 219)',
    borderWidth: '0 1px 1px 1px',
    borderRadius: '0 0 0.375rem 0.375rem'
  },
  bodyPlaceHolderBox: {
    width: '1.6rem', height: 'auto'
  }
});

const SpecialCard = React.memo(() => {
  const classes = useStyle();

  return <Box className={classes.root}>
    <Box className={classes.rightButtonRoot}>
        <Box className={classes.rightButtonPlaceHolderBox} />
        <Box className={classes.rightButtonBox}>
            <label>{'×'}</label>
        </Box>
    </Box>
    <Box className={classes.bodyRoot}>
        <Box className={classes.bodyBox}>

        </Box>
        <Box className={classes.bodyPlaceHolderBox} />
    </Box>
</Box>;
});

export default SpecialCard;
