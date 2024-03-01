import { Image } from '@nextui-org/react'
import Leon from '../assets/leonGlasses.png'
import {Link} from '@nextui-org/react'

export default function Header() {
  return (
    <div className="flex flex-col bg-slate-800 text-gray-200">
        <div className="flex flex-row items-center justify-around p-2 border-b border-slate-700">
            <Image width={30} src={Leon} />
            <Link href="/" className="text-lg">Todo App</Link>
            <span className="">Nachito-InProgress</span>
        </div>
    </div>
  )
}
