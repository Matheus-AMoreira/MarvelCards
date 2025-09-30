import Image from 'next/image'

interface CardProps {
    thumbnail: string;
    name: string;
    comics: number;
    series: number;
    stories: number;
}

export default function Card({ thumbnail, name, comics, series, stories }: CardProps){
    return (
        <div className="cardContent">
          <Image className="w-[320px] h-[300px]" width={320} height={300}src={thumbnail} alt={name}/>
            <div className='description'>
                <h2>{name}</h2>
                <div className='cardBotton'>
                    <div className='separtion'>
                        <p>Comics</p>
                        <p>{comics}</p>
                    </div>

                    <div className='separtion'>
                        <p>Series</p>
                        <p>{series}</p>
                    </div>

                    <div className='separtion'>
                        <p>Stories</p>
                        <p>{stories}</p>
                    </div>
                </div>
            </div>
          </div>
    )
}