import { Box, Icon } from '@material-ui/core';
import React from 'react';

const SpecialCard = React.memo(() => {
  return <Box style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
    <Box style={{ display: 'inline-flex', justifyContent: 'space-between', width: '100%' }}>
        <Box style={{
          width: '100%',
          height: 'auto',
          border: '1px solid rgb(205, 210, 219)',
          borderRadius: '0.375rem 0 0 0',
          borderWidth: '1px 0 0 1px'
        }}>
        </Box>
        <Box style={{
          width: '1.6rem',
          height: '1.5rem',
          border: '1px solid rgb(205, 210, 219)',
          borderRadius: '0 0.375rem 0.375rem 0',
          borderWidth: '1px 1px 1px 0'
        }}>
            {/* <Icon className='search' /> */}
            <label>{'×'}</label>
        </Box>
    </Box>
    <Box style={{ display: 'inline-flex', justifyContent: 'space-between', width: '100%' }}>
        <Box style={{
          display: 'inline-flex',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: '10rem',
          border: '1px solid rgb(205, 210, 219)',
          borderWidth: '0 1px 1px 1px',
          borderRadius: '0 0 0.375rem 0.375rem'
        }}>

        </Box>
        <Box style={{
          width: '1.6rem', height: 'auto'
        }}>

        </Box>
    </Box>
</Box>;
});

export default SpecialCard;
