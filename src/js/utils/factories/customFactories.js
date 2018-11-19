export const namespaceReducerFactory = (namespace,reducerFunction) => (state, action) => {
  const isInitializationCall = (state === undefined);
  if((action && action.namespace) !== namespace && !isInitializationCall) return state;
return reducerFunction(state, action);
};

export const namespaceActionFactory = (namespace) => (actionCreator) => (...actionArgs) => {
  const action = actionCreator(...actionArgs);
  return {...action, namespace };
};

export const namespaceAsyncActionFactory = (namespace) => (serviceArgs) =>{
  const {service,
         thenAction,
         catchAction,
         loadingAction} = serviceArgs;
  const loadingActionInstance = namespaceActionFactory(namespace)(loadingAction),
        thenActionInstance = namespaceActionFactory(namespace)(thenAction),
        catchAtionInstance = namespaceActionFactory(namespace)(catchAction);
  return ()=>(dispatch)=>{
             dispatch(loadingActionInstance());
             service()
                    .then(response =>{
                      dispatch(thenActionInstance(response));
                    })
                    .catch(error =>{
                      dispatch(catchAtionInstance(error));
                    })
            }
};
