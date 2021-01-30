import { useEffect, useState } from 'react';
import { interpret } from 'robot3';
const { create, freeze } = Object;

function valueEnumerable(value:any) {
  return { enumerable: true, value };
}

function createCurrent(service:any) {
  return freeze(create(service.machine.state, {
    context: valueEnumerable(service.context || {}),
    service: valueEnumerable(service)
  }));
}

function createUseMachine(useEffect:any, useState:any) {
  return function useMachine(providedMachine:any, initialContext:any) {
    let [machine, setMachine] = useState(providedMachine);
    let [service, setService] = useState(runInterpreter);

    let mounted = true;
    function runInterpreter(arg:any, data:any) {
      let m = arg || machine;
      return interpret(m, (service:any) => {
        if (!mounted) {
          return;
        }
        setCurrent(createCurrent(service.child || service));
      }, data || initialContext);
    }

    let [current, setCurrent] = useState(createCurrent(service));

    useEffect(() => {
      if (machine !== providedMachine) {
        setMachine(providedMachine);

        let newService = runInterpreter(providedMachine, initialContext);
        setService(newService);
        setCurrent(createCurrent(newService));
      }

      return () => {
        mounted = false;
      }
    }, [providedMachine]);

    return [current, service.send, service];
  };
}

/**
 * for robot3 only
 * 參考：react-robot 0.2.1 & robot-hooks 0.3.5 原始碼
 */
export const useMachine = createUseMachine(useEffect, useState);
