import create from 'zustand'

interface MyState {
    usersArray: Array<{ id: string, username: string, email: string, password: string, }>,
    addNewUser: (newData: { id: string, username: string, email: string, password: string }) => void
}

export const useAuthStore = create<MyState>((set) => ({
    usersArray: [],
    addNewUser: (newData) => set((state) => ({ usersArray: [...state.usersArray, newData] }))
}))