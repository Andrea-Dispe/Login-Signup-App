import {useState} from 'react';
import { v4 } from 'uuid';
import Notification from './Notification';
import { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext()

export const useAddNotification = () => {
  const dispatch = useContext(NotificationContext);
  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props
      }
    })
  }
}


export const useRemoveNotification = () => {
  const dispatch = useContext(NotificationContext);
  return (id) => {
    dispatch({
      type: "REMOVE_NOTIFICATION",
      payload: {
        id
      }
    })
  }
}

const NotificationProvider = (props) => {
  const notifications = []

  // second parameter of the callback anonymous function is the initial state
  const [state, dispatch] = useReducer((state, action) => {
    console.log('action: ', action);
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, { ...action.payload }];
      case "REMOVE_NOTIFICATION":
        console.log('action: ', action);
        return state.filter(item => item.id !== action.payload.id);
      default:
        return state;
    }
  }, notifications);

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className="notification-wrapper">
        {state.map((note) => {
          return <Notification key={note.id} {...note} />
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
}


export default NotificationProvider;