import { useEffect, useRef, useState } from 'react';

import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
  const ref = useRef<esbuild.Service>();
  const [ input, setInput ] = useState('');
  const [ code, setCode ] = useState('');

  const handleOnClickSubmit = async () => {
    if (!ref.current) {
      return;
    }

    // const result = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015'
    // });

    // setCode(result.code);

    await ref.current.build({
      plugins: [ unpkgPathPlugin() ]
    })
  };

  const startService: any = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <textarea onChange={ e => setInput(e.target.value) }></textarea>
      <button onClick={handleOnClickSubmit}>Submit</button>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
