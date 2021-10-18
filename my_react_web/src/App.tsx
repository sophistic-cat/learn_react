import { useRef } from 'react';
import { UploadButton } from './component/button';
import { TransferList, transferList, transferListRef } from './component/transferList';

export default function App() {
  const Myref = useRef<transferListRef>(null);

  const leftMenu:Array<transferList> = [
    { label: 'Company', value: 'company'},
    { label: 'Company Site', value: 'companySite'},
    { label: 'Saber', value: 'saber'},
    { label: 'Basker', value: 'basker'},
    { label: 'Archer', value: 'archer'}
  ]

  const rightMenu:Array<transferList> = [
    { label: 'P Role', value: 'pRole'},
    { label: 'P Site', value: 'pSite'},
    { label: 'Level', value: 'level'},
    { label: 'Test1', value: 'test1', disabled: true},
    { label: 'Test2', value: 'test2', disabled: true},
    { label: 'Test3', value: 'test3'}
  ]

  return (
    <div className="App">
      {/* <UploadButton label='233' onChange={(files:any)=>{console.log(files)}}/> */}
      <TransferList leftList={leftMenu} rightList={rightMenu} ref={Myref}/>
    </div>
  );
}
