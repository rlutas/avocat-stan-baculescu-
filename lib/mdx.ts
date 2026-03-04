import * as runtime from 'react/jsx-runtime';

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

export { useMDXComponent };
