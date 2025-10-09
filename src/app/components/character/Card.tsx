import Image from 'next/image'

interface CardProps {
    char: Character
}

export default function Card({ char }: CardProps){
    return (
        <div className="w-80 h-[32rem] rounded-b-2xl shadow-xl bg-[var(--navbar-color-lightblack)] transition-colors duration-600 ease-in-out
        hover:bg-red-600 hover:scale-[1.06] flex flex-col">
            <div className="w-[320px] h-[300px]">
                <Image 
                    className="w-full h-full object-cover"
                    width={320} 
                    height={300} 
                    src={`${char.thumbnail.path}.${char.thumbnail.extension}`} 
                    alt={char.name}
                />
            </div>
            <div className='text-white flex flex-col grow justify-center items-stretch'>
                <h1 className='text-4xl text-center mb-4'>{char.name}</h1>
                <div className='grid grid-cols-3 gap-[0.1rem] text-center'>
                    <div>
                        <h2 className='text-3xl font-semibold'>Comics</h2>
                        <p className='text-3xl'>{char.comics.available}</p>
                    </div>
                    <div>
                        <h2 className='text-3xl font-semibold'>Series</h2>
                        <p className='text-3xl'>{char.series.available}</p>
                    </div>
                    <div>
                        <h2 className='text-3xl font-semibold'>Stories</h2>
                        <p className='text-3xl'>{char.stories.available}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}