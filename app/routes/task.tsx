
export default function Tasks({tasks}:any) {
  
  return (
    <>
    <button
     className={`border-2 border-teal-400 w-full p-3 flex justify-between ${
      tasks.completed ? 'bg-red-200' : 'hover:bg-teal-200'
    }`}
      onClick={() => console.log('click')}
    >
      <p>{tasks.title}</p>
      <p className=" font-black">{tasks.description}</p>
    </button>
    </>
  );
}
