
export default function Tasks({tasks}:any) {
  
  return (
    <>
    <button
      className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between"
      onClick={() => console.log('click')}
    >
      <p>{tasks.title}</p>
      <p className=" font-black">{tasks.description}</p>
    </button>
    </>
  );
}
