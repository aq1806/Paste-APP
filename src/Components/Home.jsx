import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';


const Home = () => {
  const [title, setTitle]=useState('');
  const[value,setValue]=useState('');
  const [searchParams, setSearchParams]= useSearchParams();
  const pasteId=searchParams.get("pasteId");
  const dispatch= useDispatch();
  const allPastes=useSelector((state)=> state.paste.pastes);

  useEffect(()=>{
    if(pasteId){
      const paste=allPastes.find((p)=>p._id===pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
    
  },[pasteId])

  function createPaste(){
    if(title==='' && value===''){
      toast("Empty paste cannot be created");
      return ;
    }
    const paste={
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    }
    else{
      //create
      dispatch(addToPastes(paste));


    }

    //after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  }


  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
      <input
      className='p-2 rounded-2xl mt-2 w-[66%] pl-4' 
      type="text"
      placeholder='enter title here'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      
      <button 
      onClick={createPaste}
      className='p-2 rounded-2xl mt-2'>
        {
          pasteId? "Update My paste":"create my paste"
        }
      </button>

      
    </div>
    <div className='md:text-right'>
      <button onClick={() => {
          navigator.clipboard.writeText(value)
          toast.success("copied to clipboard")
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 2a1 1 0 00-1 1v2H6a3 3 0 00-3 3v11a3 3 0 003 3h12a3 3 0 003-3V8a3 3 0 00-3-3h-1V3a1 1 0 00-1-1H8zm2 2h4v2h-4V4zm-3 5a1 1 0 011-1h8a1 1 0 011 1v9a1 1 0 01-1 1H7a1 1 0 01-1-1V9z" />
        </svg>
      </button>
                      
    </div>
    <div className='mt-8'>
      <textarea
      className='rounded-2xl mt-4 min-w-[500px] p-4' 
      value={value}
      placeholder='enter content here'
      onChange={(e)=> setValue(e.target.value)}
      rows={20}
      />
    </div>
    </div>
  )
}

export default Home
