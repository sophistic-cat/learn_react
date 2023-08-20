import { Box, Icon, makeStyles } from '@material-ui/core';
import React from 'react';
import SpecialCard from '../specialCard';

const useStyle = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'inline-flex'
  },
  previewViewRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    marginLeft: '-1.2rem'
  },
  previewViewSubjectRootBox: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  previewViewSubjectPlaceholderBox: {
    width: '1.6rem',
    height: 'auto',
    borderColor: 'rgb(205, 210, 219)',
    borderStyle: 'solid',
    borderWidth: '0 0 1px 0',
    marginBottom: '-1px'
  },
  previewViewSubjectBorderBox: {
    width: '100%',
    height: '100%',
    padding: '0px 8px',
    borderStyle: 'solid',
    borderRadius: '0.375rem 0.375rem 0 0',
    borderWidth: '1px 1px 0 1px',
    borderColor: 'rgb(205, 210, 219)'
  },
  previewViewSubjectBox: {
    width: 'auto',
    marginTop: '4px',
    padding: '1px 12px',
    borderRadius: '4px',
    backgroundColor: '#D2E4F7',
    minHeight: '1.6rem',
    display: 'flex',
    alignItems: 'center'
  },
  previewViewBodyRootBox: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%'
  },
  previewViewBodyBorderBox: {
    width: '100%',
    height: 'auto',
    padding: '0px 8px 1rem 8px',
    borderStyle: 'solid',
    borderRadius: '0 0 0.375rem 0.375rem',
    borderWidth: '0 1px 1px 1px',
    borderColor: 'rgb(205, 210, 219)'
  },
  previewViewBodyBox: {
    width: 'auto',
    minHeight: '3.5rem',
    height: '100%',
    marginTop: '8px',
    borderRadius: '4px',
    backgroundColor: '#D2E4F7'
  },
  previewViewBody: {
    border: 'unset !important',
    height: 'auto !important',
    '& > div': {
      padding: 0,
      height: 'auto'
    }
  }
});

const PreviewTemplate = React.memo(() => {
  const classes = useStyle();

  return <Box style={{ width: '100%', height: '100%', display: 'inline-flex' }}>
        <Box style={{ width: 'auto', minWidth: '10rem', marginRight: '2px' }}>
            <SpecialCard />
        </Box>
        {/** 右边预览部分 */}
        <Box className={classes.previewViewRoot} >
            {/** 预览标题部分 */}
            <Box className={classes.previewViewSubjectRootBox}>
                {/** 占位用的Box */}
                <Box className={classes.previewViewSubjectPlaceholderBox} />
                {/** 标题主体 */}
                <Box className={classes.previewViewSubjectBorderBox}>
                    <Box className={classes.previewViewSubjectBox}>
                        <h3 style={{ margin: 0 }}>{'测试主旨'}</h3>
                    </Box>
                </Box>
            </Box>
            {/** 预览内容部分 */}
            <Box className={classes.previewViewBodyRootBox} >
                <Box className={classes.previewViewBodyBorderBox}>
                    <Box className={classes.previewViewBodyBox}>
                        <Box id={'quillId'} className={classes.previewViewBody} />
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>;
});

export default PreviewTemplate;
