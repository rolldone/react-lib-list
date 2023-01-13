import react from 'react';

export default class List extends react.Component<any, any>{
  
  constructor(props: any) {
    super(props);
  }

  render(): react.ReactNode {
    return <>
      <h1>This is lib</h1>
    </>
  }
}