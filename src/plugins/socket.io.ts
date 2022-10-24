import { io } from 'socket.io-client'

export const useSocketIO = () => {
  // @ts-ignore
  const socket = io(import.meta.env.APP_API_URI)
  return {
    socket,
  }
}
