import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  :[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste=action.payload;

      //add a check -> Paste already exist wala case(i.e same title agar hai to paasu inu paste na banaavo)
      const title=paste.title;
      const titleMatch=state.pastes.find((p)=>p.title===title);
      if(titleMatch){
        toast("same title already exists");
        return ;
      }
      
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast("Paste Created successfully")
    },
    updateToPastes: (state,action) => {
      const paste= action.payload;
      const index=state.pastes.findIndex((item)=> item._id===paste._id);
      if(index>=0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));

        toast.success("paste Updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes");
      
    },
    removeFromPastes:(state,action) => {

      const pasteId=action.payload;
      console.log(pasteId);
      const index=state.pastes.findIndex((item)=> item._id===pasteId);

      if(index>0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));

        toast.success("paste deleted");
      }



    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer