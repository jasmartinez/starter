const Actions = {  
  signIn: (data) => { 
    return {
            type: "LOGIN",
            payload: data
          }
        }
}

export default Actions  