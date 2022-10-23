import { io } from 'socket.io-client'

export const useSocketIO = () => {
  const socket = io(import.meta.env.VITE_API_URI)
  return {
    socket,
  }
}
