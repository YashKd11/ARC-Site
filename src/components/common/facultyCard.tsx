export default function FacultyCard({
    id,
    name,
    aImage,
    Designation,
    Description,
  }) {
    return (
      <div className='p-4 w-[300px] h-[450px] bg-[#EEEBE8] rounded-xl flex flex-col justify-between items-center'>
        <img src={aImage} alt={name} className='w-[200px] h-[250px] object-cover rounded-md' />
        <div className='flex flex-col gap-[1px] items-center text-center'>
          <h3 className='text-[#853333] font-bold text-2xl'>{name}</h3>
          <div className='w-2/3 h-1 bg-[#853333]'></div>
          <p className='uppercase text-lg font-extrabold mt-2'>Hi {Designation}</p>
        </div>
      </div>
    );
  }
  