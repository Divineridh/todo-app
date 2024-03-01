import { Listbox, ListboxItem } from '@nextui-org/react'
import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="flex flex-col w-1/12">
        <Listbox
            selectionMode="single"
            classNames={{
                list: "text-gray-100 pl-4"
            }}
        >
            <ListboxItem key="notes" endContent=">" as={Link} to="/dashboard">Notes</ListboxItem>
            <ListboxItem key="tasks" endContent=">" as={Link} to="/">Tasks</ListboxItem>
            <ListboxItem key="books" endContent=">" as={Link} to="/books">Books</ListboxItem>
        </Listbox>
    </div>
  )
}
