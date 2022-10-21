import { io } from 'socket.io-client'

export const useSocketIO = () => {
  const socket = io('https://fast-supply.herokuapp.com/')
  return {
    socket,
  }
}
