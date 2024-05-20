import React, { useLayoutEffect, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  rootId: string;
  wrapperId?: string;
  wrapperClass?: string;
  children?: React.ReactNode;
}

export default function Portal(props: Props) {
  const el = useRef(document.createElement('div'));

  useLayoutEffect(() => {
    const rootElement = document.getElementById(props.rootId) as HTMLElement;

    rootElement.appendChild(el.current);

    return () => {
      rootElement.removeChild(el.current);
    };
  }, []);

  useEffect(() => {
    const element = el.current;

    if(props.wrapperId) {
      element.id = props.wrapperId;
    }

    if(props.wrapperClass) {
      element.className = props.wrapperClass;
    }

  }, [props.wrapperId, props.wrapperClass]);

  return ReactDOM.createPortal(props.children, el.current);
}
