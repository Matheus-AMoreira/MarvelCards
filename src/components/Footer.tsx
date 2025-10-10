interface footerProps {
    text:string
}

export default function Footer({text}:footerProps){
    return (
        <footer className="text-center w-full">
            <a href="https://www.marvel.com/" >{text}</a>
        </footer>
    )
}