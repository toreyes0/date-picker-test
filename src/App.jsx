import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const daysOfWeek = ['S', 'S', 'M', 'T', 'W', 'T', 'F']
  const prevMonthDays = [26, 27, 28, 29, 30]
  const days = Array.from(Array(31), (_, i) => i + 1)
  const nextMonthDays = Array.from(Array(6), (_, i) => i + 1)
  const times = [
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
  ]

  const [datetimeDisplay, setDatetimeDisplay] = useState(null)
  const [selectedDay, setSelectedDay] = useState(6)
  const [showCalendar, setShowCalendar] = useState(false)
  
  const [timeDisplay, setTimeDisplay] = useState('')
  const [showTimeMenu, setShowTimeMenu] = useState(false)
  function setTime(i) {
    setTimeDisplay(i)
    setShowTimeMenu(false)
  }

  const timezones = ['EST', 'UTC']
  const [timezoneDisplay, setTimezoneDisplay] = useState('')
  const [showTimezoneMenu, setShowTimezoneMenu] = useState(false)
  function setTimezone(i) {
    setTimezoneDisplay(i)
    setShowTimezoneMenu(false)
  }

  useEffect(() => {
    if (!showCalendar && timeDisplay !== '' && !timezoneDisplay !== '') {
      setDatetimeDisplay(`${selectedDay}/09/2023 ${timeDisplay} (${timezoneDisplay})`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCalendar])

  return (
    <>
      <div className='text-lg font-semibold mb-3'>
        Date and time <span className='text-red-700'>*</span>
      </div>
      <div className='flex items-center mb-4'>
        <input id='publish-check' type='checkbox' className='h-4 mx-1 accent-red-700' />
        <div className='text-sm'>Publish ASAP</div>
        <span className='material-symbols-outlined text-gray-500 text-sm ml-1'>info</span>
      </div>
      <div className='text-gray-500 text-sm mb-2'>Publication date:</div>
      <div className='flex items-center justify-between w-80 py-1 px-2 border-[1px] rounded-md text-gray-400 bg-white hover:cursor-pointer' onClick={() => setShowCalendar(showCalendar ? false : true)}>
        <div className='flex items-center gap-1'>
          <span className='material-symbols-outlined text-base'>calendar_month</span>
          {
            !datetimeDisplay
              ? <div className='text-sm'>Select release date <span className='text-red-700'>*</span></div>
              : <div className='text-sm'>{datetimeDisplay}</div>
          }
        </div>
        <span className='material-symbols-outlined text-gray-600'>expand_more</span>
      </div>
      <div className={`${showCalendar ? 'block' : 'hidden'} w-80 mt-1 text-sm bg-white`}>
        <div className='flex items-center justify-between w-full p-2 bg-black text-white rounded-t-md font-semibold'>
          <span className='material-symbols-outlined'>chevron_left</span>
          September 2023
          <span className='material-symbols-outlined'>chevron_right</span>
        </div>
        <div className='flex flex-wrap w-full'>
          {daysOfWeek.map((i) => (<><div className='day-ele text-red-700'>{i}</div></>))}
          {prevMonthDays.map((i) => (<><div className='day-ele text-gray-300'>{i}</div></>))}
          {days.map((i) => (
            <>
              <div className='day-ele'>
                <input
                  type='radio'
                  name='day'
                  className='flex justify-center items-center appearance-none rounded h-[22px] w-6 cursor-pointer'
                  checked={i === selectedDay} onClick={() => setSelectedDay(i)}
                />
                <div className='day-no absolute text-center rounded h-[22px] w-6 pointer-events-none'>{i}</div>
              </div>
            </>
          ))}
          {nextMonthDays.map((i) => (<><div className='day-ele text-gray-300'>{i}</div></>))}
        </div>
        <div className='flex p-3 rounded-b-md border-t-[1px]'>
          <div className='w-1/2 px-2'>
            <div className='font-semibold text-xs mb-2'>Publication Time</div>
            <div
              className='relative flex items-center justify-between py-1 px-2 border-[1px] rounded-md text-gray-400 bg-white hover:cursor-pointer'
              onClick={() => setShowTimeMenu(showTimeMenu ? false : true)}
            >
              <div className='text-xs'>{timeDisplay}</div>
              <span className='material-symbols-outlined text-gray-600'>expand_more</span>
              <div className={`${showTimeMenu ? 'block' : 'hidden'} absolute top-8 left-0 w-full h-36 overflow-y-auto py-1 bg-white border-[1px] rounded-md`}>
                {times.map((i) => (
                  <><div className='px-2 py-1 text-xs hover:bg-slate-100 hover:cursor-pointer' onClick={(e) => {e.stopPropagation(); setTime(i)}}>{i}</div></>
                ))}
              </div>
            </div>
          </div>

          <div className='w-1/2 px-2'>
            <div className='font-semibold text-xs mb-2'>Publication Timezone</div>
            <div
              className='relative flex items-center justify-between py-1 px-2 border-[1px] rounded-md text-gray-400 bg-white hover:cursor-pointer'
              onClick={() => setShowTimezoneMenu(showTimezoneMenu ? false : true)}
            >
              <div className='text-xs'>{timezoneDisplay}</div>
              <span className='material-symbols-outlined text-gray-600'>expand_more</span>
              <div className={`${showTimezoneMenu ? 'block' : 'hidden'} absolute top-8 left-0 w-full py-1 bg-white border-[1px] rounded-md`}>
                {timezones.map((i) => (
                  <><div className='px-2 py-1 text-xs hover:bg-slate-100 hover:cursor-pointer' onClick={(e) => {e.stopPropagation(); setTimezone(i)}}>{i}</div></>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
