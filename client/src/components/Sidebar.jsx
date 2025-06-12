import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser,setUnseenMessages ,unseenMessages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  const filteredUsers = input
    ? users.filter(user => user.fullName.toLowerCase().includes(input.toLowerCase()))
    : users;

  return (
    <div className={`bg-[#8185B2]/10 h-full p-4 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? 'max-md:hidden' : ''}`}>
      {/* Top section */}
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src={assets.logo} alt="logo" className='max-w-40' />

          <div className='relative py-2 group'>
            <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-32 p-4 mt-1 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block group-hover:pointer-events-auto pointer-events-none'>
              <p
                onClick={() => navigate('/profile')}
                className='cursor-pointer text-sm hover:underline'
              >
                Edit Profile
              </p>
              <hr className='my-2 border-t border-gray-500' />
              <p
                onClick={logout}
                className='cursor-pointer text-sm hover:underline'
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <img src={assets.search_icon} alt="Search" className='w-3' />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder='Search User...'
            className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1'
          />
        </div>
      </div>

      {/* User List */}
      <div className='flex flex-col'>
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {setSelectedUser(user), setUnseenMessages(prev => ({...prev,[user._id] : 0}))}}
            key={index}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer transition-colors hover:bg-[#282142]/40 max-sm:text-sm ${selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''}`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="User"
              className='w-[35px] aspect-square rounded-full'
            />
            <div className='flex flex-col leading-5'>
              <p className='truncate max-w-[120px] sm:max-w-[200px]'>{user.fullName}</p>
              <span className={`text-xs ${onlineUsers.includes(user._id) ? 'text-green-400' : 'text-neutral-400'}`}>
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </span>
            </div>

            {unseenMessages[user._id] > 0 && (
              <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
