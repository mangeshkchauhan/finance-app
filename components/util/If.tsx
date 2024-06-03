import React, {ReactNode} from 'react';

type IfProps = {
  condition: boolean;
  orElse?: ReactNode;
} & {children?: ReactNode};

const If: React.FC<IfProps> = ({condition, orElse = null, children}) => {
  if (condition) {
    return <>{children}</>;
  }
  return <>{orElse}</>;
};

export default If;
